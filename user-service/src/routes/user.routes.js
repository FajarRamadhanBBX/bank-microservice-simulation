const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/profiles', userController.createProfile);
router.get('/me/profiles', userController.getProfile);
router.put('/me/profiles', userController.updateMyProfile);
router.get('/admin/profiles', userController.getAllProfiles);

module.exports = router;