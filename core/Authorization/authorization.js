const jwt = require("jsonwebtoken")

module.exports = (request, response, next) => {

    try {
        const token = request.get("authorization").split(" ")[1]
        const decodedToken = jwt.verify(token, "mykey")
        request.role = decodedToken.role;
        request._id = decodedToken._id;
        console.log(decodedToken)
        next()
    } catch (error) {
        error.message = "Not Authonticated"
        error.status = 403
        next(error)
    }
}



module.exports.isAdmin = (request, response, next) => {
    if (request.role == "admin") {
        next();
    } else {
        let error = new Error("Not Authorized")
        error.status = 403
        next(error)
    }
}

module.exports.checkAdminAndTeacher = (request, response, next) => {

    console.log(request.role)
    if (request.role == "teacher" || request.role == "admin") {
        next()
    } else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}