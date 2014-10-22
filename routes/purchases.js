var express = require('express');
var Purch = require("purchase");
var Restriction = require("restriction");
var config = require("config");
var router = express.Router();
var https = require('https');
var push = require('push');
var crypto = require('crypto');
/**
 * @api {post} /purchases/ Create a new Purchase if validated
 * Calls come from Cedit Card Company
 * @apiParam {String} credit_hash Hashed Credit Card number
 * @apiParam {Number} purchase_type Purchase Identifier
 * @apiParam {Number} purchase_amount Requested purchase amount
 * @apiParam {String} security_token user security token
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
	 res.setHeader('Access-Control-Allow-Origin', config.URL_ORIGIN);
	 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	 res.setHeader('Access-Control-Allow-Credentials', true);
	//Since methods run asyncly I used callbacks
	Restriction.getUserRestrictionAmountByPurchaseType(req,function(rest_amount,purchase_type,live_restrict){
		Purch.getPurchasesTotalByType(req,function(totalPurchases){
			// validate deal
			rest_amount = parseFloat(rest_amount)
			if((rest_amount > parseFloat(totalPurchases) && parseFloat(req.body.purchase_amount) <= rest_amount) || rest_amount < 0){
				//create a new purchase in parse
				Purch.newPurchase(req, function(){
							res.send({status:config.STATUS_PURCHASE_APPROVED});
				});
			}
			else{
				var pushData = {
				          alert: config.pushBodyFormatter(purchase_type,req.body.purchase_amount,rest_amount),
				          title: "Are you sure you want to make this purchase?",
				          sound: "chime"
				};
				push.sendPush(pushData)
				//is liveRestriction on	u
				var _purchaseStatus = live_restrict ? config.STATUS_PURCHASE_PENDING : config.STATUS_PURCHASE_DENIED
				//create a new purchase with status 0
				Purch.newPendingPurchase(req, function(purchaseRes){
					//purchase denied!
					var _purchaseId = purchaseRes[0].success.objectId
					res.send({
						status:_purchaseStatus,
						purchase_id: _purchaseId
					});					
				});
			}
		})
	},function(){ //if failed
		res.send({status:config.STATUS_NO_CREDENTIALS})
	});
});
/**
 * @api {put} /purchase/:id Set Denied Purchase As Approved (Status 1020)
 * @apiGroup Purchase
 * @apiSuccessExample Purchase-Approved:
 * {
 * 		status: 1020
 * }
 */
router.route('/purchase/:id')
.put(function(req, res) {
	 res.setHeader('Access-Control-Allow-Origin', config.URL_ORIGIN);
	 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	 res.setHeader('Access-Control-Allow-Credentials', true);
	 var purchaseId = req.params.id;
	
	 Purch.updateDeniedPurchaseToApproved(req,function(){
		 res.send({status:config.STATUS_PURCHASE_APPROVED});
	 })
});
module.exports=router;