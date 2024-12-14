const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: { type: String, required: true }, 
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    typeSport: { type: String, required: true},
    planner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
},{
    collection: 'events',
    timestamps: true // createdAt, updateAt
})

const Events = mongoose.model("Events", eventSchema);

//Exportamos el módulo
module.exports = Events; 