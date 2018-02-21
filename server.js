var express = require('express');
var app = express();

global.temp = 0;

var W1Temp = require('w1temp');
var gpio = require("omega_gpio");


app.get('/', function (req, res) {
   res.send('{t: ' + temp + '}');
})

W1Temp.setGpioPower(19);

W1Temp.getSensorsUids().then(function (sensorsUids) {     
  console.log(sensorsUids);         
                                                             
        W1Temp.getSensor(sensorsUids).then(function (sensor) {
                                                             
        // print actual temperature                           
        var t = sensor.getTemperature();                  
//        console.log('Actual temp:', t, '..C');             
                                                     
         // print actual temperature on changed  
        sensor.on('change', function(t){          
//          console.log(t); 
           temp=t;                         
                                                     
        });                                                   
      });                                  
}); 






var server = app.listen(8888, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
