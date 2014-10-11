var express = require('express');
var Purch = require("purchase");
var Restriction = require("restriction");
var config = require("config");
var router = express.Router();
var https = require('https');
var requestify = require('requestify');
var crypto = require('crypto');
/**
 * @api {post} /purchases/ Create a new Purchase if validated
 * Calls come from Cedit Card Company
 * @apiParam {String} credit_hash Hashed Credit Card number
 * @apiParam {Number} purchase_type Purchase Identifier
 * @apiParam {Number} purchase_amount Requested purchase amount
 * @apiSuccessExample Purchase-Approved:
 * {
 * 		status: 1020
 * }
 * @apiErrorExample Purchase-Denied:
 * {
 * 		status: 1010
 * }
  * @apiErrorExample User-not-found:
 * {
 * 		status: 1101
 * }
 * @apiName CreatePurchases
 * @apiGroup Purchases
 */
router.route('/purchases')
.post(function(req, res) {
	//Since methods run asyncly I used callbacks
	Restriction.getUserRestrictionAmountByPurchaseType(req,function(rest_amount,purchase_type){
		Purch.getPurchasesTotalByType(req,function(totalPurchases){
			// validate deal
			if(rest_amount > totalPurchases){
				//create a new purchase in parse
				Purch.newPurchase(req, function(){
							res.send({status:config.STATUS_PURCHASE_APPROVED});
				});
			}
			else{
				var pushData = {
				          alert: config.pushBodyFormatter(purchase_type,rest_amount),
				          title: "Are you sure you want to make this purchase?",
				          sound: "chime"
				};
				var headers = {
					"Content-Type" : "application/json",
					"X-Parse-Application-Id": "CtKrDhLEMo8k05hV4HekNMkx4MXmpBercuzruQ2T", 
					"X-Parse-REST-API-Key": "wOcrKgh0Q6icbGJ4gotHtmLpYdVPntPhhMKpGVsc",
				};
				var options = {
					hostname: 'api.parse.com',
					path: '/1/push',
					method: 'POST',
					headers: headers,
				};
				requestify.request('https://api.parse.com/1/push', {
					method: 'POST',
					body: {
							where : {},
							data : pushData
					},
					headers:headers,
					dataType: 'json'        
				})
				//purchase denied! 
				res.send({status:config.STATUS_PURCHASE_DENIED});
			}
		})
	},function(){ //if failed
		res.send({status:config.STATUS_NO_CREDENTIALS})
	});
});
module.exports=router;