const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restauratSchema = new Schema ({
    name: {
        type: String, 
        requried: true
    },
    name_en: {
        type: String,
        requried:  true
    },
    category: {
        type: String,
        requried: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    google_map: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        requried: true
    },
    description: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Restaurant', restauratSchema)
// const restaurantSchema = new Schema ({
//     name: String,
//     name_en: String,
//     category: String,
//     image: String,
//     location: String,
//     phone: String,
//     google_map: String,
//     rating: Number,
//     description: String,
//     required: true
// })