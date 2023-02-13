const mongoose = require("mongoose")

const { ObjectID } = require("Bson")
const AutoIncrement = require("mongoose-sequence")(mongoose);

const classSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, require: true },
    supervisor: { type: ObjectID, require: false, ref: "teachers" },
    children: [{ type: Number, ref: "children" }]
}, { _id: false })

classSchema.plugin(AutoIncrement);


mongoose.model("classes", classSchema);