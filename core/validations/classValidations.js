const { body, param, query } = require("express-validator")

module.exports.addClassValidations = [

    body("_id").optional().isInt().withMessage("ID must be ObjectId!"),
    body("name").isAlpha().withMessage("Name must be String!"),
    body("supervisor").isMongoId().withMessage("Supervisor must be ObjectId!"),
    body("children").isArray().withMessage("Children must be Array!"),
    body("children").custom((value) => {
        if (!value.every(Number.isInteger)) throw new Error('Array must be Integers');
        return true;
    })

]
module.exports.updateClassValidations = [

    body("_id").isMongoId().withMessage("ID must be ObjectId!"),
    body("name").optional().isAlpha().withMessage("Name must be String!"),
    body("supervisor").optional().isMongoId().withMessage("Supervisor must be ObjectId!"),
    body("children").optional().isArray().withMessage("Children must be Array!"),
    body("children[*]").isNumeric().withMessage('Array must be Integers')

]
module.exports.deleteClassValidations = [

    body("_id").isMongoId().withMessage("ID must be number!")
    //.isEmpty().withMessage("ID Required!")
]

module.exports.getClassValidations = [

    body("_id").isInt().withMessage("ID must be number!")
]

module.exports.getClassSupervisorValidation = [

    body("_id").isInt().withMessage("ID must be number!")
]

module.exports.getClassChildrenValidations = [

    body("_id").isInt().withMessage("ID must be number!")
]