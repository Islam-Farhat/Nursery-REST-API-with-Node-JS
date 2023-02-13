const { body, param, query } = require("express-validator")

module.exports.addChildValidations = [

    body("_id").isNumeric().withMessage("ID must be number!"),
    body("name").isAlpha().withMessage("Name must be String!"),
    body("age").isNumeric().withMessage("Age must be number"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Level must be PreKG,KG1,KG2"),
    body("password").isString().withMessage("password must be String!"),
    body("address").isObject().withMessage("address must be Object!"),
    body("address.city").isString().withMessage("City must be String!"),
    body("address.street").isString().withMessage("Street must be String!"),
    body("address.buliding").isInt().withMessage("Buliding must be Number!"),
]


module.exports.updateChildValidations = [

    body("_id").isNumeric().withMessage("ID must be number!"),
    body("name").optional().isAlpha().withMessage("Name must be String!"),
    body("age").optional().isNumeric().withMessage("Age must be number"),
    body("level").optional().isIn(["PreKG", "KG1", "KG2"]).withMessage("Level must be PreKG,KG1,KG2"),
    body("address").optional().isObject().withMessage("address must be Object!"),

    body("password").isString().withMessage("password must be String!"),

    body("address.city").optional().isString().withMessage("City must be String!"),
    body("address.street").optional().isString().withMessage("Street must be String!"),
    body("address.buliding").optional().isNumeric().withMessage("Buliding must be Number!"),
]

module.exports.deleteChildValidations = [

    body("_id").isNumeric().withMessage("ID must be number!")
]

module.exports.getChildValidations = [

    body("_id").isNumeric().withMessage("ID must be number!")
]