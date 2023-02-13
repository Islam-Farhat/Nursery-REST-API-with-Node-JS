const mongoose = require("mongoose")
require("./../Model/classModel")
const teacherSchema = mongoose.model("teachers")
const childSchema = mongoose.model("children")
const classSchema = mongoose.model("classes")

module.exports.getAllClasses = (request, response, next) => {
    classSchema.find({})
        .populate({ path: "supervisor" })
        .populate({ path: "children" })

    .then(data => {
            response.status(201).json({ data })

        })
        .catch(error => { next(error); })
}
module.exports.getClassByID = (request, response, next) => {
    childSchema.findOne({ _id: request.body._id })
        .then(data => {
            if (data == null)
                throw new Error("Child doesn't exixts")
            else
                response.status(201).json({ data })

        })
        .catch(error => { next(error); })
}

module.exports.addClass = async(request, response, next) => {
    try {
        let objectClass = new classSchema({
            _id: request.body._id,
            name: request.body.name,
            supervisor: request.body.supervisor,
            children: request.body.children,
        })
        let teacher = await teacherSchema.findOne({ _id: request.body.supervisor })
        if (teacher == null) {
            throw new Error(
                `The Teacher with Id : ${request.body.supervisor} is Not exist`
            )
        }
        for (let item of request.body.children) {
            let child = await childSchema.findOne({ _id: item })
            if (child == null) {
                throw new Error(`Child with Id : ${item} is Not exist`)
            }
        }
        let data = await objectClass.save()
        response.status(201).json({ data })
    } catch (error) {
        next(error)
    }
}

module.exports.updateClass = (request, response, next) => {
    classSchema.findByIdAndUpdate(request.body._id, {
            _id: request.body._id,
            name: request.body.name,
            supervisor: request.body.supervisor,
            children: request.body.children,
        })
        .then(data => {

            response.status(201).json({ data: "Updated" })

        })
        .catch(error => { next(error); })
}
module.exports.deleteClass = (request, response, next) => {
    classSchema.deleteOne({ _id: request.body._id })
        .then(data => {

            response.status(201).json({ data: "Delete Class" })

        })
        .catch(error => { next(error); })
}

module.exports.getClassSupervisor = (request, response, next) => {
    classSchema.findOne({ _id: request.body._id }, { supervisor: 1 })
        .populate({ path: "supervisor" })
        .then(data => {
            if (data == null)
                throw new Error("Supervisor doesn't exixts")
            else
                response.status(201).json({ data })

        })
        .catch(error => { next(error); })
}

module.exports.getClassChildren = (request, response, next) => {
    classSchema.find({ _id: request.body._id }, { children: 1 })
        .populate({ path: "children" })
        .then(data => {
            if (data == null)
                throw new Error("Supervisor doesn't exixts")
            else
                response.status(201).json({ data })

        })
        .catch(error => { next(error); })
}