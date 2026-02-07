const pool = require("../config/db");
const router = require("express").Router();
const accountController = require("../controllers/account.controller");
const verifyInternalAccess = require("../middleware/verifyInternal.middleware")

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

router.post("/", accountController.createAccount);
router.get("/me", accountController.getMyAccount);
router.put("/admin/freeze", accountController.freezeAccount);
router.get("/lookup", accountController.lookupAccount);
router.get("/internal/account", 
    accountController.getAccountInternal
);
router.post("/internal/balance", 
    verifyInternalAccess,
    accountController.updateBalanceInternal
);

module.exports = router;