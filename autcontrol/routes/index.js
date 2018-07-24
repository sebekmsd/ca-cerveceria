var express = require('express');
var router = express.Router();


/** Inicializacion **/

var Timer = require('./timer.js');
var OmegaIFace = require('./io_iface.js');

var control = new OmegaIFace(15,20,19);
control.init();
control.initRelay(3);

console.log('IO Face inicializado');

timer = new Timer(10);

global.temp = 0;

var W1Temp = require('w1temp');
var gpio = require("omega_gpio");

global.controlIntervalId = null;

var processControl = () =>{

  id = setInterval(function(arg){
    //check temperatura y control
    //console.log('Check');
  },1000);
  return id;
}

//Incializar el control de la temperatura
pc = processControl();


/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log('Procesando rindex');

	t = timer.getElapsedTime();
  	console.log(t);
  
  
    m =  Math.floor( t / 60);
    s = t % 60;

    res.render('index', { 
    	elpased_time: m + 'm : ' + s +'s',
    	temperature: control.temperature(), 
    	"rele" : control.status() });
});

function changeState(action,id){

  switch(action){
    case 'open':
      control.openRelay(id); break;
    case 'close':
      control.closeRelay(id); break;
  }
}

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
			//Ejecutar la acción contra el rele
			changeState(state,item.replace('r',''));
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
