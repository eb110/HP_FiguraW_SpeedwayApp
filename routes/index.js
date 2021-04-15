/*
Project Created by Wladyslaw Figura
S1920048
Glasgow Caledonian University Honours Project
Computing 2021
*/

const express = require('express')
const router = express.Router()

let bodyParser = require('body-parser');
router.use(bodyParser.json());

const Rider = require('../models/rider')
let ridersList = []

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/resultTable', (req, res) => {
    res.send({ riders: ridersList })
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



let dataTypedByUser = []
router.post('/getResult', (req, res) => {
    dataTypedByUser = req.body.result
    res.send()
})

router.post('/newRider', async (req, res) => {
    let newRdr = req.body.newRider
    newRdr.date = new Date(newRdr.date)
    if (newRdr.name != '') {
        try {
            const newRider = new Rider({
                name: newRdr.name,
                bornYear: newRdr.date
            })
            await newRider.save()
            console.log('rider created')
            console.log(newRdr.name)
        } catch (error) {
            console.log(error)
        }
    }
    else console.log('empty rider')
})

router.get('/teamLeft', (req, res) => {
    res.send({ riders: dataTypedByUser[0] })
})

router.get('/teamRight', (req, res) => {
    res.send({ riders: dataTypedByUser[1] })
})


module.exports = router
