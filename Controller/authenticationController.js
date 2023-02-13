const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
const teacherSchema = mongoose.model("teachers")
    // const childSchema = mongoose.model("children")
    // const classSchema = mongoose.model("classes")


module.exports.login = (request, response, next) => {

    if (request.body.name == "Islam" && request.body.password == "qwe") {
        let token = jwt.sign({
            role: "admin",
            _id: 1,
            name: request.body.name
        }, "mykey", { expiresIn: "2h" })
        response.status(201).json({ data: "Login as Admin", token })
    } else {
        teacherSchema.findOne({ name: request.body.name }, { password: request.body.password })
            .then(data => {
                if (data == null) {
                    error = new Error("Not Authonticated")
                    error.status = 401;
                    next(error)
                } else {
                    let token = jwt.sign({
                        role: "teacher",
                        _id: data._id,
                        name: data.name
                    }, "mykey", { expiresIn: "2h" })
                    response.status(201).json({ data: "Login as Teacher", token })
                }
            })
            .catch(error => {
                error = new Error("Not Authonticated")
                error.status = 401;
                next(error)
            })


    }
}