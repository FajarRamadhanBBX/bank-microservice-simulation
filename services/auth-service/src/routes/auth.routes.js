const pool = require("../config/db");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/health", async (_req, res) => {
  try {
    tes = await pool.query("SELECT 1");
    console.log("Request reach here, From /health");
    return res.status(200).send("OK success.");
  } catch (err) {
    console.error("Health check error:", err.message);
    return res.status(503).send("DB NOT READY");
  }
});

// router.get("/health", authController.testDb);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/update-password", authController.updatePassword);
router.put("/me/deactivate", authController.deactivateAuth);
router.post("/register/admin", authController.registerAdmin);
router.get("/admin/users", authController.getAllUsers);
router.get("/admin/users/email", authController.getUser);
router.put("/admin/users/status", authController.changeStatusByAdmin);

module.exports = router;