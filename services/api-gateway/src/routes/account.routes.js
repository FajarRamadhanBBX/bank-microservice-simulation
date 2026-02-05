const router = require('express').Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRolesMiddleware = require("../middlewares/role.middleware");

const {
    createAccount,
    myAccount,
    freezeAccount,
    lookupAccount,
    updateBalance
} = require("../proxies/account.proxy");

router.post('/',
    authMiddleware,
    allowRolesMiddleware(["user"]),
    createAccount
);

router.get('/me', 
    authMiddleware,
    allowRolesMiddleware(["user"]),
    myAccount
);

router.get('/lookup', 
    authMiddleware,
    allowRolesMiddleware(["user"]),
    lookupAccount
);

router.put('/admin/freeze', 
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    freezeAccount
);


router.post('/internal/balance', 
    updateBalance
);

module.exports = router;