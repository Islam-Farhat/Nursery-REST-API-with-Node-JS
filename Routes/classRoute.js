const express = require("express")
const classController = require("./../Controller/classController")
const { addClassValidations, deleteClassValidations, getClassValidations, getClassSupervisorValidation, getClassChildrenValidations, updateClassValidations } = require("./../core/validations/classValidations")
const checkValidations = require("./../core/validations/checkValidations")
const authorization = require("./../core/Authorization/authorization")



const classRoute = express.Router();

classRoute.route("/class")
    .all(authorization.isAdmin)
    .get(classController.getAllClasses)
    .post(addClassValidations, checkValidations, classController.addClass)
    .patch(updateClassValidations, checkValidations, classController.updateClass)

classRoute.route("/class")
    .delete(authorization.isAdmin, deleteClassValidations, checkValidations, classController.deleteClass)

classRoute.route("/class")
    .get(authorization.isAdmin, getClassValidations, checkValidations, classController.getClassByID);

classRoute.route("/classTeacher")
    .get(authorization.isAdmin, getClassSupervisorValidation, checkValidations, classController.getClassSupervisor);

classRoute.route("/classchildern")
    .get(authorization.isAdmin, getClassChildrenValidations, checkValidations, classController.getClassChildren);


module.exports = classRoute;