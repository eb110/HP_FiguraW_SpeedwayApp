const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
app.use(express.urlencoded({ extended: false}))

app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('oh yeah, the server is running')
})
