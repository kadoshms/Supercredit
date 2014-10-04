var express = require('express');
var Purch = require("purchase");
var router = express.Router();
/**
 * Save a new purchase to parse
 * method: POST
 * .../api/purchases/
 */
router.route('/purchases')
.post(function(req, res) {
	Purch.newPurchase(req)
	res.send({ message: 'added' });
});
module.exports=router;