const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRolesMiddleware = require("../middlewares/role.middleware");

const {
    transaction,
    myTransactionHistory,
    allTransactionsHistory
} = require("../proxies/transaction.proxy");

router.post("/",
    authMiddleware,
    allowRolesMiddleware(["user"]),
    transaction
)

router.get("/me",
    authMiddleware,
    allowRolesMiddleware(["user"]),
    myTransactionHistory
)

router.get("/admin/history",
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    allTransactionsHistory
)

module.exports = router;