const mongoose = require("mongoose")
require("./../Model/childModel")
const childSchema = mongoose.model("children")



module.exports.getAllChildern = (request, response, next) => {
    childSchema.find({})
        .then(data => {
            response.status(201).json({ data })

        })
        .catch(error => { next(error); })
}

module.exports.getAllChildByID = (request, response, next) => {
    childSchema.findOne({ _id: request.body._id }, { password: 1 })
        .then(data => {
            if (data == null)
                throw new Error("Child doesn't exixts")
            else
                response.status(201).json({ data })

        })
        .catch(error => { next(error); })
}

module.exports.addChild = (request, response, next) => {
    let objectChild = new childSchema({
        _id: request.body._id,
        name: request.body.name,
        age: request.body.age,
        password: request.body.password,
        level: request.body.level,
        address: {
            city: request.body.address.city,
            street: request.body.address.street,
            buliding: request.body.address.buliding,
        }
    });
    objectChild.save()
        .then(data => {
            response.status(201).json({ data: "Add child" })

        })
        .catch(error => { next(error); })
}

module.exports.updateChild = (request, response, next) => {
    childSchema.findByIdAndUpdate(request.body._id, {
            _id: request.body._id,
            name: request.body.name,
            age: request.body.age,
            password: request.body.password,
            level: request.body.level,
            address: {
                city: request.body.address.city,
                street: request.body.address.street,
                buliding: request.body.address.buliding,
            }
        })
        .then(data => {

            response.status(201).json({ data: "Updated" })

        })
        .catch(error => { next(error); })
}

module.exports.deleteChild = (request, response, next) => {
    childSchema.deleteOne({ _id: request.body._id })
        .then(data => {

            response.status(201).json({ data: "Delete Child" })

        })
        .catch(error => { next(error); })
}