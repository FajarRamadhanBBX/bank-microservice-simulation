const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/health", userController.testDb);
router.post("/profiles", userController.createProfile);
router.get("/profiles/me", userController.getProfile);
router.put("/profiles/me", userController.updateMyProfile);
router.get("/admin/profiles", userController.getAllProfiles);

module.exports = router;