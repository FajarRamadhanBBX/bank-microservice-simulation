const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/update-password", authController.updatePassword);
router.put("/me/deactivate", authController.deactivateAuth);
router.post("/register/admin", authController.registerAdmin);
router.get("/admin/users", authController.getAllUsers);
router.get("/admin/users/email", authController.getUser);
router.put("/admin/users/status", authController.changeStatusByAdmin);

module.exports = router;