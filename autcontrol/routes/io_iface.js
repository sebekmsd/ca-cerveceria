console.log('*** inicializando aplicacion');

var tempMax = ( process.env.MAX_TEMP != null ) ? process.env.MAX_TEMP : 20 ;
var tempMin = ( process.env.MIN_TEMP != null ) ? process.env.MIN_TEMP : 15 ;


var relay_pins = [18,0 , 1 , 6 , 7 ];

const MAX_NUM_RELAY = 3;

var relays= Array();

var W1Temp = require('w1temp');
var gpio = require("omega_gpio");

global.temperature = 0;

global.R1 = null;

var OmegaIFace = function(t_min,t_max, t_io_pin){
  this._tmax = t_max;
  this._tmin = t_min;
  this._t_in = ( t_io_pin == null || t_io_pin == undefined ) ? 19 : t_io_pin ;
  console.log('Estableciendo pin IO para sensor de temperatura en this._t_in');
  W1Temp.setGpioPower(t_io_pin);
}



console.log('Preparando dispositivo');

OmegaIFace.prototype.init = () => {

    W1Temp.getSensorsUids().then(function (sensorsUids) {
        console.log(sensorsUids);
        W1Temp.getSensor(sensorsUids).then(function (sensor) {

        // print actual temperature on changed 
        sensor.on('change', function(temp){
          temperature = temp;  
  
        });
      });
});
}

OmegaIFace.prototype.temperature = ()=>{
	return temperature;
}


OmegaIFace.prototype.initRelay=(num_relay)=>{
  console.log('iniciando sistema de relay');
  if(num_relay !== undefined ){

  }else{

  }
  for( i = 0 ;  i < num_relay && i < MAX_NUM_RELAY ; i++ ){
    console.log('Configurando pin ' + relay_pins[i]);
    relays.push(gpio.Relay);
    relays[i] = new Relay(relay_pins[i]);
    relays[i].off();
    relays[i].on();
  }
  
}

OmegaIFace.prototype.destroyRelay = ()=>{
  for( i = 0 ; i < relays.length; i++ ){

    if ( relays[i] != null && relays[i] != undefined ){ 
      relays[i].destroy();
    }
  }
  
}



OmegaIFace.prototype.openRelay = (releId) => {
  console.log(releId);
  if( releId >= relays.length ){
    throw new Exception('El identificador no existe');
  }
  relays[releId-1].on();  //En base cero
  console.log('Abriendo rele ' + releId);
}

OmegaIFace.prototype.closeRelay = (releId) => {
  if( releId >= relays.length ){
    throw new Exception('El identificador no existe');
  }
  relays[releId-1].off();  //En base cero
  console.log('Abriendo rele ' + releId);
}




OmegaIFace.prototype.status=()=>{
  status = 
  [ 
    { "name" : "r1", "state" : "close" },
    { "name" : "r2", "state" : "close" },
    { "name" : "r3", "state" : "close" }
  ]
  return status;
}

module.exports = OmegaIFace;
