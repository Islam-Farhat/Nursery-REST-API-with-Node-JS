const express = require("express")
const childController = require("./../Controller/childController")
const { addChildValidations, deleteChildValidations, getChildValidations, updateChildValidations } = require("./../core/validations/childValidations")
const checkValidations = require("./../core/validations/checkValidations")
const authorization = require("./../core/Authorization/authorization")

const childRoute = express.Router();

childRoute.route("/childern")
    .all(authorization.isAdmin)
    .get(childController.getAllChildern)
    .post(addChildValidations, checkValidations, childController.addChild)
    .patch(updateChildValidations, checkValidations, childController.updateChild)

childRoute.route("/child")
    .get(authorization.isAdmin, getChildValidations, checkValidations, childController.getAllChildByID)

childRoute.route("/child")
    .delete(authorization.isAdmin, deleteChildValidations, checkValidations, childController.deleteChild)


module.exports = childRoute;