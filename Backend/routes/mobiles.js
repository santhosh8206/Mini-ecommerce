const express=require('express');
const { getSingleMobile, getMobiles }=require('../controllers/mobilesController');
const router = express.Router();


router.route('/mobiles').get(getMobiles)
router.route('/mobiles/id').get(getSingleMobile)

module.exports = router;