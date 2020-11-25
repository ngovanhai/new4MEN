const router = require('express').Router()
const testCtrl = require('../controllers/testCtrl')


router.route('/test')
    .get(testCtrl.getTest)
    .post(testCtrl.createTest)
router.route('/test')
    .put()
module.exports = router