const mongoose = require("mongoose")

const adressSchema = new mongoose.Schema({
    city: String,
    street: String,
    buliding: Number
}, { _id: false })
const childSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, require: true },
    age: Number,
    password: String,
    //level:{type : String, enum["PreKG", "KG1", "KG2"] },
    level: { type: String, require: true },
    address: Object,
    address: adressSchema
})



///model(collectionName, SchemaObject)
mongoose.model("children", childSchema);