const router = require("express").Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/", transactionController.transaction);
router.get("/me", transactionController.myTransactionHistory);
router.get("/admin/history", transactionController.transactionsHistory);

module.exports = router;