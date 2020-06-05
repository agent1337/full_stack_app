require('dotenv').config({path: "src/.env"})
import express from "express"
import {check} from "express-validator"
const chekAuth = require('../middleware/check-auth')
const UsersController = require('../controllers/users')
const users = express.Router()

users.get('/getAllUsers', UsersController.users_get_all)


users.post('/signUp', [ //validation params
        check('email')
            .isEmail()
            .normalizeEmail(),
        check('password')
            .isLength({min: 5, max: 20})
    ], UsersController.users_sign_up)


users.post('/logIn', UsersController.users_log_in)


users.get('/user/data/:userId', chekAuth, UsersController.users_data)


users.put('/user/reset/:userId', chekAuth, UsersController.users_reset_pass)


users.delete('/user/data/:userId', chekAuth, UsersController.users_delete_item)


// to delete selected items
users.post('/user/data/:userId', chekAuth, UsersController.users_delete_items)


module.exports = users