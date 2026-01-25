const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/users", authController.getAllUsers);
router.post("/user", authController.getUser);
router.put("/update-password", authController.updatePassword);
router.delete("/unregister", authController.unregisterUser);

module.exports = router;