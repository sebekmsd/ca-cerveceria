var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', subtitle: 'Express2' rele: ['close', 'close'] });
});

router.post('/relay',function(req,res,next){
	res.render('index',{ r1: 'open', r2: 'open'} );
});

module.exports = router;
