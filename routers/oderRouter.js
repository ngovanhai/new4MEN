const router = require('express').Router()
const oderCtrl = require('../controllers/oderCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/oder')
    .get(oderCtrl.getOder)
    .post(oderCtrl.createOder)
router.route('/oder/:id')
    .put(oderCtrl.updateCheck)

module.exports = router