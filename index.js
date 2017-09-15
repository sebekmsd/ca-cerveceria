console.log('*** inicializando aplicacion');

var tempMax = ( process.env.MAX_TEMP != null ) ? process.env.MAX_TEMP : 20 ;
var tempMin = ( process.env.MIN_TEMP != null ) ? process.env.MIN_TEMP : 15 ; 


if ( isNaN(tempMax) || isNaN(tempMin)){
   console.log('Error:  Variable tempMapx o tempMin no es numerica');
   console.log('Min:' + tempMin + ', Max:' + tempMax); 
   return;
} 

if( tempMin < 0 || tempMax > 110 ){
   console.log('Error: Temperatura min o max fuera de rango: min:' + tempMin + ' Max:' + tempMax);
   return;
}

console.log('TempMax: ' + tempMax);
console.log('TempMin: ' + tempMin);


var W1Temp = require('w1temp');
var gpio = require("omega_gpio");
var Timer = require('./timer.js');

console.log('Preparando dispositivo');
W1Temp.setGpioPower(19);

//var bomba1 = new Relay(0);


timer = new Timer();

function checkTemperatura(_temp){
     var temp = _temp.toFixed(1);
     console.log(temp);	
     if(temp >= tempMax ){
        //Apagar el motor y el fogon
        console.log('apagando el motor');
     }else if(temp <= tempMin ){
        console.log('encendiendo motor de recirculacion');
     }else{
        console.log('Temperatura dentro del rango: ' + temp);	
     }

} 


W1Temp.getSensorsUids().then(function (sensorsUids) {
  console.log(sensorsUids);
  
        W1Temp.getSensor(sensorsUids).then(function (sensor) {

        // print actual temperature 
        var temp = sensor.getTemperature();
        console.log('Actual temp:', temp, '°C');

	 // print actual temperature on changed 
        sensor.on('change', function(temp){
             checkTemperatura(temp);      
  
        });
      });
});



timer.programIntervals([10],function(i){                        
     console.log('Tiempo finalizado');                    
     return;

}); 
