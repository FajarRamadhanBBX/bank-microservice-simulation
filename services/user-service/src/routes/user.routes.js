const pool = require("../config/db");
const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/health", async (_req, res) => {
  try {
    tes = await pool.query("SELECT 1");
    console.log("Request reach here, From /health.");
    return res.status(200).send("OK");
  } catch (err) {
    console.error("Health check error:", err.message);
    return res.status(503).send("DB NOT READY");
  }
});

router.post("/profiles", userController.createProfile);
router.get("/profiles/me", userController.getProfile);
router.put("/profiles/me", userController.updateMyProfile);
router.get("/admin/profiles", userController.getAllProfiles);

module.exports = router;