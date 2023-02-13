const mongoose = require("mongoose")

const { ObjectID } = require("Bson")

const teacherSchema = new mongoose.Schema({
    _id: ObjectID,
    name: { type: String, require: true },
    password: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        //validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    image: String
})

///model(collectionName, SchemaObject)
mongoose.model("teachers", teacherSchema);