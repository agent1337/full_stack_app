import express from "express"
import {check} from "express-validator"
const items = express.Router()
const ItemController = require('../controllers/items')
const chekAuth = require('../middleware/check-auth')


items.get('/getAllItems', ItemController.items_show_all)



items.post('/addItem/:userId', chekAuth, [ //validation params
    check('name')
        .isLength({min: 1, max: 35})
], ItemController.items_add_item)



items.put('/updateItem/:itemId/:itemName', chekAuth, [ //validation params
    check('newName')
        .isLength({min: 0, max: 35})
], ItemController.items_update_item)



items.get('/updateItem/:itemId/:itemName', chekAuth, ItemController.items_get_groupes)



module.exports = items