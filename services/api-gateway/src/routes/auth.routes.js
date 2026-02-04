const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRolesMiddleware = require("../middlewares/role.middleware");

const {
    register,
    registerAdmin,
    login,
    updateUserPassword,
    deactivateMyAuth,
    getUserByEmail,
    getUsersAuth,
    changeUserStatus
} = require("../proxies/auth.proxy");

router.post("/register",
    register
)

router.post("/register/admin",
    registerAdmin
)

router.post("/login",
    login
)

router.put("/update-password",
    authMiddleware,
    updateUserPassword
)

router.put("/me/deactivate",
    authMiddleware,
    allowRolesMiddleware(["user"]),
    deactivateMyAuth
)

router.get("/admin/users/email",
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    getUserByEmail
)

router.get("/admin/users",
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    getUsersAuth
)

router.put("/admin/users/status",
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    changeUserStatus
)

module.exports = router;