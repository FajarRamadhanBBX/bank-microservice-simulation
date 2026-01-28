const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRolesMiddleware = require("../middlewares/role.middleware");
const {
    createProfile,
    getAllProfiles,
    getMyProfile,
    updateMyProfile
} = require("../proxies/user.proxy");

router.post("/profiles",
    authMiddleware,
    allowRolesMiddleware(["user"]),
    createProfile
)

router.get("/profiles/me",
    authMiddleware,
    allowRolesMiddleware(["user"]),
    getMyProfile
);

router.put("/profiles/me",
    authMiddleware,
    allowRolesMiddleware(["user"]),
    updateMyProfile
)

router.get("/admin/profiles",
    authMiddleware,
    allowRolesMiddleware(["admin"]),
    getAllProfiles
)

module.exports = router;