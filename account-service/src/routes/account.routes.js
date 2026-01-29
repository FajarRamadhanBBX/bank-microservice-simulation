const router = require('express').Router();
const accountController = require('../controllers/account.controller');

router.post('/', accountController.createAccount);
router.get('/me', accountController.getMyAccount);
router.put('/admin/freeze', accountController.freezeAccount);
router.get('/lookup', accountController.lookupAccount);
router.post('/internal/balance', accountController.updateBalanceInternal);

module.exports = router;