import express from 'express'
import * as swaggerDocument from './swagger.json'
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app: express.Application = express()
const port = process.env.PORT || 9000;

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// SWAGGER DOCS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// ROUTES
let Users = require('./routes/Users')
let Items = require('./routes/Items')

app.use('/users', Users)
app.use('/items', Items)


// START SERVER
app.listen(port, () => console.log(`server is running on port ${port}`))

module.exports