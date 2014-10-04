var express = require('express');
var Purch = require("purchase");
var Restriction = require("restriction");
var config = require("config");
var router = express.Router();
/**
 * @api {post} /purchases/ Create a new Purchase if validated
 * @apiName CreatePurchases
 * @apiGroup Purchases
 */
router.route('/purchases')
.post(function(req, res) {
	Restriction.getUserRestrictionAmountByPurchaseType(req,function(rest_amount){
		Purch.getPurchasesTotalByType(req,function(totalPurchases){
			// validate deal
			if(rest_amount > totalPurchases){
				//create a new purchase in parse
				Purch.newPurchase(req);
			}
			else{
				//purchase denied!
				res.send({status:config.STATUS_PURCHASE_DENIED});
			}
		})
	});
});
module.exports=router;