const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/update-password", authController.updatePassword);
router.put("/me/deactivate", authController.deactivateAuth);
router.get("/admin/users", authController.getAllUsers);
router.get("/admin/users/email/:email", authController.getUser);
router.put("/admin/users/:id/status", authController.changeStatusByAdmin);

module.exports = router;