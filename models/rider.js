const mongoose = require('mongoose');
const Rider = new mongoose.Schema({
 name:{
     type: String,
     required: true
 },
 bornYear:{
     type: Date,
     default: 1/1/1
 },
 allPoints:{
     type: Number,
     default: 0
 },
 points:{
    type: Number,
    default: 0
},
bonuses:{
    type: Number,
    default: 0
},
perfects:{
    type: Number,
    default: 0
},
runs:{
    type: Number,
    default: 0
},
games:{
    type: Number,
    default: 0
},
aveRun:{
    type: Number,
    default: 0
},
aveGame:{
    type: Number,
    default: 0
}

})

module.exports = mongoose.model('Rider', Rider)