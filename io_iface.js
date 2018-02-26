console.log('*** inicializando aplicacion');

var tempMax = ( process.env.MAX_TEMP != null ) ? process.env.MAX_TEMP : 20 ;
var tempMin = ( process.env.MIN_TEMP != null ) ? process.env.MIN_TEMP : 15 ; 


var W1Temp = require('w1temp');
var gpio = require("omega_gpio");

global.temperature = 0;

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

        // print actual temperature 
//        var t = sensor.getTemperature();
//        console.log('Actual temp:', t, '°C');

        // print actual temperature on changed 
        sensor.on('change', function(temp){
//          console.log('T: ' + temp);
          temperature = temp;  
  
        });
      });
});
}

OmegaIFace.prototype.temperature = ()=>{
	return temperature;
}

OmegaIFace.prototype.openRelay = (releId) => {
  console.log('Abriendo rele ' + releId);
}

OmegaIFace.prototype.closeRelay = (releId) => {
  console.log('cerrando rele');
}

OmegaIFace.prototype.status=()=>{
  status = {
    r1 : "close",
    r2 : "close",
    r3 : "close",
    s1 : 1
  }
  return status;
}

module.exports = OmegaIFace;
