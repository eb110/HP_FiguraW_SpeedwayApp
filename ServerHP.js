/*
Project Created by Wladyslaw Figura
Glasgow Caledonian University Honours Project
Computing 2021
*/

//Routing
const express = require('express')
const app = express()
//Layout
const expressLayouts = require('express-ejs-layouts')

//data base
require('./models/mongoose')

//routing
const indexRouter = require('./routes/index')
app.use(express.urlencoded({ extended: false}))

//layout
app.use(expressLayouts)
app.set('layout', 'layouts/layout')

//view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname))

//routing
app.use('/', indexRouter)

//server
app.listen(process.env.PORT || 3000, () => {
    console.log('oh yeah, the server is running')
})


