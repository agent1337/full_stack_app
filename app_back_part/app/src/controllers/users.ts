require('dotenv').config({path: "src/.env"})
import {Request, Response} from "express"
import {validationResult} from "express-validator"
import {v4 as uuidv4} from "uuid"
const Item = require("../models/Item")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const saltRounds: number = 10
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

exports.users_get_all = (req: Request, res: Response) => {
    User.findAll()
        .then((user) => {
            let allUsers = JSON.stringify(user, null, 2)
            res.send(allUsers)
        })
}


exports.users_sign_up = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    bcrypt.genSalt(saltRounds, function (err: Error, salt) {
        bcrypt.hash(req.body.password, salt, function (err: Error, hash: String) {
            const today: string = new Date().toLocaleString()
            const todaySubStr: string = today.substr(0, today.length - 3)
            const newUserInfo: object = {
                id: uuidv4(),
                email: req.body.email,
                password: hash,
                created: todaySubStr
            }
            User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then((user) => {
                    if (!user) {
                        User.create(newUserInfo)
                            .then((user) => {
                                res.json({
                                    successText: user.email + " registered",
                                    status: "Success",
                                    userId: user.dataValues.id
                                })
                            })
                            .catch((err: Error) => {
                                res.send("error: " + err)
                            })
                    } else {
                    res.json({errorText: "This email is already registered", status: "Faild"})}
                })
                .catch((err: Error) => {
                    res.send("error: " + err)
                })
        })
    })

}


exports.users_log_in = (req: Request, res: Response) => {
    let remember = req.body.remember
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then((user) => {
            if (user === null) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            } else {
            bcrypt.compare(req.body.password, user.password, (err: Error, result: Response) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    if (remember) {
                        const token: any = jwt.sign({
                                email: user.email,
                                userId: user.id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "500h"
                            },
                        )
                        return res.status(200).json({
                            userId: user.id,
                            status: "Success",
                            message: 'Auth successful for 500h',
                            token: token
                        })
                    } else {
                        const token: any = jwt.sign({
                                email: user.email,
                                userId: user.id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "5h"
                            },
                        )
                        return res.status(200).json({
                            userId: user.id,
                            status: "Success",
                            message: 'Auth successful for 10s',
                            token: token
                        })
                    }
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })};
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}


exports.users_data = (req: Request, res: Response) => {
    const currentUserId = req.params.userId
    return Item.findAll({
        where: {
            userid: currentUserId
        },
        order: [
            ['createdAt', 'ASC']
        ]
    })
        .then((items: any) => {
            res.json(items)
        })
        .catch((err: object) => {
            res.status(500).json({
                error: err
            })
        })

}


exports.users_reset_pass = (req: Request, res: Response) => {
    const currentUserId = req.params.userId
    const newPassword = Math.random().toString(36).substring(5);
    bcrypt.genSalt(saltRounds, function (err: Error, salt) {
        bcrypt.hash(newPassword, salt, function (err: Error, hash: String) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADRESS,
                    pass: process.env.EMAIL_PASS
                }
            })
            let mailOptions = {
                from: 'artemdev0109@gmail.com',
                to: req.body.email,
                subject: 'Your password was successfully reset',
                text: `Use this new password to log in the system: ${newPassword}`
            }
            User.findOne({
                where: {
                    id: currentUserId
                }
            })
                .then((user) => {
                    if (user) {
                        User.update({password: hash}, {
                            where: {
                                id: currentUserId
                            }
                        })
                            .then(() => {
                                transporter.sendMail(mailOptions, (err: Error) => {
                                    if (err) {
                                    }
                                    res.json({errorText: 'Email sent to ' + user.email, status: "Success"})
                                })
                            })
                            .catch((err: Error) => {
                                res.json({message: err})
                            })
                    } else {
                    res.json({errorText: "User not found", status: "Failed"})}
                })
                .catch((err: Error) => {
                    res.json({message: err})
                })
        })
    })
}


exports.users_delete_item = (req: Request, res: Response) => {
    Item.destroy({
        where:{
            id:req.body.itemId
        }
    })
        .then(() => {
            res.json({errorText: 'Item was successfully deleted', status: "Success"})
        })
        .catch((err:Error) => {
            res.json({message: err})
        })
}


exports.users_delete_items = (req: Request, res: Response) => {
    Item.destroy({
        where:{
            id: req.body.itemsIdArr
        }
    })
        .then(() => {
            res.json({errorText: 'Items was successfully deleted', status: "Success"})
        })
        .catch((err:Error) => {
            res.json({message: err})
        })
}