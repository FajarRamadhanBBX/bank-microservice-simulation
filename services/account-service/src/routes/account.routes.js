const router = require("express").Router();
const accountController = require("../controllers/account.controller");
const verifyInternalAccess = require("../middleware/verifyInternal.middleware")

router.get("/health", accountController.testDb);
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