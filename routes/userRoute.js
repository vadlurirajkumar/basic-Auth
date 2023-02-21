const express = require("express")
const router = express.Router()
const {signupUser,loginUser,protected} = require("../controllers/userController")
const middleware = require("../middleware/middlewarefile")

router.post("/register",signupUser)
router.post("/login",loginUser)
router.get("/profile", middleware, protected)


module.exports = router