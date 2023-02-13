const express = require("express")
const teacherController = require("./../Controller/teacherController")
const { addTeacherValidations, deleteTeacherValidations, updateTeacherValidations } = require("./../core/validations/teacherValidations")
const checkValidations = require("./../core/validations/checkValidations")
const authorization = require("./../core/Authorization/authorization")

const teacherRoute = express.Router();

teacherRoute.route("/teachers")
    .patch(authorization.checkAdminAndTeacher, updateTeacherValidations, checkValidations, teacherController.updateTeacher) //

teacherRoute.route("/teachers")
    //.all(authorization.isAdmin)
    .get(teacherController.getAllTeachers)
    .post(addTeacherValidations, checkValidations, teacherController.addTeacher)


teacherRoute.route("/teacher")
    .delete(authorization.isAdmin, deleteTeacherValidations, checkValidations, teacherController.deleteTeacher)

module.exports = teacherRoute;