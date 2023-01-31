const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({sucess: true, route: "blogs", message:"welcome to the blogs page"});
});

module.exports = router;
