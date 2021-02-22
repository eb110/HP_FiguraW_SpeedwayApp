const express = require('express')
const router = express.Router()

let bodyParser = require('body-parser');
router.use(bodyParser.json());

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
    res.send({riders: ridersList})
})

let dataTypedByUser = []
router.post('/getResult', (req, res) => {
    dataTypedByUser = req.body.result
    res.send()
})

router.post('/newRider', async (req, res) => {
    let newRdr = req.body.newRider
    newRdr.date = new Date(newRdr.date)
    const newRider = await new Rider({
        name: newRdr.name,
        bornYear: newRdr.date
    })
    await newRider.save()
})

router.get('/teamLeft', (req,res) => {
    res.send({riders: dataTypedByUser[0]})
})

router.get('/teamRight', (req,res) => {
    res.send({riders: dataTypedByUser[1]})
})


module.exports = router
