var express = require("express");
var router = express.Router();
var controller = require("../controllers/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/validRegister",controller.validRegistration);
router.post("/confrimRegister",controller.confirmRegistration)


module.exports = router;
