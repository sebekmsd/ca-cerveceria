var express = require('express');
var router = express.Router();


/** Inicializacion **/

var Timer = require('./timer.js');
var OmegaIFace = require('./io_iface.js');

var control = new OmegaIFace(0 , 1,7);
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

   console.log('Procesando respuesta: '+ JSON.stringify(req.body));
   var data = req.body;
   
   //actualizar el rele
   new_state = ( data.state === 'close' ) ? 'open' : 'close';
   console.log('Nuevo status ' + new_state);
   changeState(new_state,data.name.replace('r',''));
   console.log('Retornando respuesta');
   res.send( { name: data.name , state: new_state });
   console.log('Fin');

});

router.get('/temp',function(req,res,next){
   
   res.send({ t: Math.floor(Math.random() * 75)  });
});

module.exports = router;
