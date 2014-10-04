var express = require('express');
var Purch = require("purchase");
var Restriction = require("restriction");
var config = require("config");
var router = express.Router();
/**
 * @api {post} /purchases/ Create a new Purchase if validated
 * @apiSuccessExample Purchase-Approved:
 * {
 * 		status: 1020
 * }
 * @apiErrorExample Purchase-Denied:
 * {
 * 		status: 1010
 * }
 * @apiName CreatePurchases
 * @apiGroup Purchases
 */
router.route('/purchases')
.post(function(req, res) {
	//Since methods run asyncly I used callbacks
	Restriction.getUserRestrictionAmountByPurchaseType(req,function(rest_amount){
		Purch.getPurchasesTotalByType(req,function(totalPurchases){
			// validate deal
			if(rest_amount > totalPurchases){
				//create a new purchase in parse
				Purch.newPurchase(req, function(){
					res.send({status:config.STATUS_PURCHASE_APPROVED});
				});
			}
			else{
				//purchase denied!
				res.send({status:config.STATUS_PURCHASE_DENIED});
			}
		})
	});
});
module.exports=router;