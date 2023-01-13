const mongoose = require('mongoose')

const viewerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    viewWebsite:{
        type: String,
        required: true
    },
    viewDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Viewers', viewerSchema)