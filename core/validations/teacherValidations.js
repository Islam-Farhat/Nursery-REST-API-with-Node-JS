const { body, param, query } = require("express-validator")

module.exports.addTeacherValidations = [

    body("_id").optional().isMongoId().withMessage("ID must be ObjectId!"),
    body("name").isAlpha().withMessage("Name must be String!"),
    body("email").isEmail().withMessage("Don't match email Pattern"),
    body("password").isString().withMessage("password must be String!"),
    body("image").isString().withMessage("image must be String!")
]
module.exports.updateTeacherValidations = [
    body("_id").isMongoId().withMessage("ID must be ObjectId!"),
    body("name").optional().isAlpha().withMessage("Name must be String!"),
    body("email").optional().isEmail().withMessage("Don't match email Pattern"),
    body("password").optional().isAlpha().withMessage("password must be String!"),
    body("image").optional().isAlpha().withMessage("image must be String!")
]

module.exports.deleteTeacherValidations = [

    //param("_id").isMongoId().withMessage("ID must be number!")
    body("_id").isMongoId().withMessage("ID must be number!")
]