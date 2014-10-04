var express = require('express');
var Kaiseki = require('kaiseki');
var router = express.Router();
//instantiate
var APP_ID = 'CtKrDhLEMo8k05hV4HekNMkx4MXmpBercuzruQ2T';
var REST_API_KEY = 'wOcrKgh0Q6icbGJ4gotHtmLpYdVPntPhhMKpGVsc';
var kaiseki = new Kaiseki(APP_ID, REST_API_KEY);
/**
 * Save a new purchase to parse
 * method: POST
 * .../api/purchases/
 */
router.route('/purchases')
.post(function(req, res) {
	var className = 'Purchases';
	var purchase = [{
			'userId' : req.param('userId'),
			'purchase_type' : req.param('purchase_type'),
			'purchase_amount' : req.param('purchase_amount')
	}]
	kaiseki.createObjects(className, purchase, function(err, res, body, success) {
		console.log(err);
	            console.log('objects created = ', body);
	});
	res.send({ message: 'added' });
});
module.exports=router;