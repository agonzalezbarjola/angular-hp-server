
const mongoose = require('mongoose') 



const characterSchema = new mongoose.Schema({
    name:{ type: String, require: true, trim: true},
    img:{type: String, trim: true},
    age:{ type: Number},
    gender:{ type: String},
    house: {type: String, require: true }
})



const Character = mongoose.model('character',characterSchema)
module.exports = Character