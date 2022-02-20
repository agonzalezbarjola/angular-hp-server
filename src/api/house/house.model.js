

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HousesSchema = new Schema({
    name: { type: String, required: true },
    animal: { type: String, required: false },
    members: [{ type: Schema.Types.ObjectId, ref: 'character', required: true }],
    description: { type: String, required:false},
    img: [{type: String, required: true}]
}, { timestamp: true }
)

const House = mongoose.model('Houses', HousesSchema)
module.exports = House