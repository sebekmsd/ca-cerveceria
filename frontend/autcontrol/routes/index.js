var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('Procesando rindex');
  res.render('index', { title: 'Express',
      subtitle: 'Express2' , 
         "rele" : [{'name': 'r1' ,'state':'close'}, {'name': 'r2','state':'close'}] });
});

router.post('/relay',function(req,res,next){

	console.log('Procesando respuesta'+ JSON.stringify(req.body));
    var data = req.body;
	var rele =Array()
	//actualizar el rele
	for(item in data ){
		console.log(data[item]);
		if(item==='temperatura'){
			continue;
		}
		state = 'close';
		if( Array.isArray(data[item]) ){
			console.log('Seleccionado : ' + item);
			state = ( data[item][1] === 'close' ) ? 'open' : 'close';
		}else{
			state = data[item];
		}
		rele.push({name: item , state: state});
		//call 
		url = "/" + state + "/" + item.replace('r','');
		console.log(url);	
	}


	console.log(rele);	

	res.render('index',{ "rele" : rele } );
});

module.exports = router;
