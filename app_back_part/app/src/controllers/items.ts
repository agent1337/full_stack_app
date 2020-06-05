import {Request, Response} from 'express'
import {validationResult} from 'express-validator'
import {v4 as uuidv4} from 'uuid'

const Item = require('../models/Item')

exports.items_show_all = (req: Request, res: Response) => {
    Item.findAll()
        .then((item: any) => {
            let getItem = JSON.stringify(item, null, 2)
            res.send(getItem)
        })
}


exports.items_add_item = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({errors: errors.array(), status: "Faild"})
        return res.status(422).json({errors: errors.array()})
    }
    const currentUserId = req.params.userId
    const today: string = new Date().toLocaleString()
    const todaySubStr: string = today.substr(0, today.length - 3)
    const newItemInfo: object = {
        id: uuidv4(),
        name: req.body.name,
        userid: currentUserId,
        groups: req.body.groups,
        created: todaySubStr
    }
    Item.create(newItemInfo)
        .then((item: any) => {
            res.json({errorText: item.name + " created", status: "Success"})
        })
        .catch((err: Error) => {
            res.send("error: " + err)
        })

}


exports.items_update_item = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({errors: errors.array(), status: "Faild"})
        return res.status(422).json({errors: errors.array()})
    }

    const newName = req.body.newName
    const currentItemId = req.params.itemId
    Item.findOne({
        where: {
            id: currentItemId
        }
    })
        .then((item: any) => {
            const groups = req.body.groups.join()
            if (item) {
                console.log(newName)
                if (newName !== "") {
                    Item.update({name: newName, groups: groups}, {
                        silent: true,
                        where: {
                            id: currentItemId
                        }
                    })
                        .then(() => {
                            res.json({
                                errorText: item.name + ' successfully changed to ' + newName,
                                status: "Success"
                            })
                        })
                        .catch((err: Error) => {
                            res.json({message: err})
                            console.log(err)
                        })
                } else {
                    console.log("newName is empty")
                    Item.update({groups: groups}, {
                        silent: true,
                        where: {
                            id: currentItemId
                        }
                    })
                        .then(() => {
                            res.json({
                                errorText: groups + ' successfully added',
                                status: "Success"
                            })
                        })
                        .catch((err: Error) => {
                            res.json({message: err})
                            console.log(err)
                        })
                }

            } else {
                res.json({errorText: "Item not found", status: "Failed"})
                console.log("Item not found")
            }
        })
        .catch((err: Error) => {
            res.json({message: err})
            console.log(err)
        })

}


exports.items_get_groupes = (req: Request, res: Response) => {
    const currentItemId = req.params.itemId
    Item.findOne({
        where: {
            id: currentItemId
        }
    })
        .then((item: any) => {
            const itemGroups = item.dataValues.groups.split(',')
            res.send(itemGroups)
        })
}