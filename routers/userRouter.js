const router = require('express').Router();
const userCtrl = require('../controllers/UserCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth, userCtrl.getUser)

router.get('/allUser', auth, userCtrl.getAllUser)

router.route('/user/:id')
    .get(userCtrl.getOneUser)
    .delete(userCtrl.removeUser)
    .put(userCtrl.updateUser)
module.exports = router;