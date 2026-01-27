const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRolesMiddleware = require("../middlewares/role.middleware");
const {
    createProfile,
    getProfile,
    getAllProfiles,
    getMyProfile,
    updateMyProfile,
    deleteMyProfile
} = require("../proxies/user.proxy");

router.post("/profiles",
    authMiddleware,
    allowRolesMiddleware(["user", "admin"]),
    createProfile
)

router.get("/profiles",
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    getProfile
)

router.post("/admin/profiles",
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    getAllProfiles
)

router.get("/me",
    authMiddleware,
    allowRolesMiddleware(["user", "admin"]),
    getMyProfile
);

router.put("/me",
    authMiddleware,
    allowRolesMiddleware(["user", "admin"]),
    updateMyProfile
)

router.delete("/me",
    authMiddleware,
    allowRolesMiddleware(["user", "admin"]),
    deleteMyProfile
)

module.exports = router;