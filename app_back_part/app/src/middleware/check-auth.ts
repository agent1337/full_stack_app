import {NextFunction, Response} from "express"
const jwt = require("jsonwebtoken")
require('dotenv').config({path: "src/.env"})

module.exports = (req, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded:any = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}

