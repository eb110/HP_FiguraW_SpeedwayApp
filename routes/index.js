const express = require('express')
const router = express.Router()

const Rider = require('../models/rider')
let ridersList = []

router.get('/', (req, res) => {

    res.render('index.ejs')
})

router.get('/newResult', async (req, res) => {
    let ridersAll = []
    ridersAll = await Rider.find({})
    ridersList = []
    ridersAll.forEach((rider) => {
        ridersList.push(rider.name)
    })
    res.render('newResult.ejs', {
        riders: ridersList
    })
})

router.get('/resultTable', (req,res) => {
    res.send({olo: 1})
})



module.exports = router
