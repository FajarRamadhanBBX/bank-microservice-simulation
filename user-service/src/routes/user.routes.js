const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/profiles', userController.createProfile);
router.get('/profiles/:auth_id', userController.getProfile);
router.get('/profiles', userController.getAllProfiles);
router.get('/me', userController.getMe);
router.put('/me', userController.updateMyProfile);
router.delete('/me', userController.deleteMyProfile);

module.exports = router;