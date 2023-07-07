const router = require('express').Router()
const userController = require("../controller/user.js")
const cookieParser = require('cookie-parser')
router.use(cookieParser());

router.post('/register',userController.register)
router.post("/login",userController.login) //donot need to write userControlller by viraj
router.get("/users",userController.user)


module.exports = router;