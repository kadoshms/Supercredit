var express = require('express');
var Restriction = require("restriction");
var router = express.Router();
router.route('/restrictions')
/**
 * @api {post} /restrictions/ Create a new Restriction
 * @apiName CreateRestrictions
 * @apiGroup Restrictions
 */
.post(function(req, res) {
	Restriction.newRestriction(req)
	res.send({ message: 'Restriction Added Successfully.' });
});
router.route('/restrictions/:userId')
	/**
	 * @api {get} /restrictions/:userId Request User Restrictions
	 * @apiName GetRestrictions
	 * @apiGroup Restrictions
	 */
	.get(function(req,res){
		Restriction.getRestrictionByUser(req);
		res.send({ message: 'hello' });
});
module.exports=router;