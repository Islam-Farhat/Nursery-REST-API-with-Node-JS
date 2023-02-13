const mongoose = require("mongoose")
require("./../Model/teacherModel")
const teacherSchema = mongoose.model("teachers")
const crypto = require("crypto")
const { header } = require("express-validator")

const encrypt = (plainText, password) => {
    try {
        const iv = crypto.randomBytes(16);
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(plainText);
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return iv.toString('hex') + ':' + encrypted.toString('hex');

    } catch (error) {
        console.log(error);
    }
}


header('Access-Control-Allow-Origin: *')

module.exports.getAllTeachers = (request, response, next) => {
    teacherSchema.find({})
        .then(data => {
            response.status(201).json(data )

        })
        .catch(error => { next(error); })

}

module.exports.addTeacher = (request, response, next) => {
    const pass = "secret1234"
    let objectTeacher = new teacherSchema({
        _id: request.body._id,
        name: request.body.name,
        password: encrypt(request.body.password, pass),
        email: request.body.email,
        image: request.body.image
    });
    objectTeacher.save()
        .then(data => {
            response.status(201).json({ data: "Add teacher" })

        })
        .catch(error => { next(error); })

}

module.exports.updateTeacher = (request, response, next) => {

    teacherSchema.findByIdAndUpdate(request.body._id, {
            _id: request.body._id,
            name: request.body.name,
            password: request.body.password,
            email: request.body.email,
            image: request.body.image
        })
        .then(data => {

            response.status(201).json({ data: "Updated" })

        })
        .catch(error => { next(error); })

}
module.exports.deleteTeacher = (request, response, next) => {

    teacherSchema.deleteOne({ _id: request.body._id })
        .then(data => {

            response.status(201).json({ data })

        })
        .catch(error => { next(error); })

}