var express = require('express');
var app = express();

global.temp = 0;

var W1Temp = require('w1temp');
var gpio = require("omega_gpio");


app.get('/', function (req, res) {
   res.send('{t: ' + temp + '}');
})


app.post('/start',function(req,res){

  console.log(req);

  response = { id : 'time',
               state: 'OK'}
  res.json(response);
});






//Set el pin 19 para la entrada del sensor de temperatura
W1Temp.setGpioPower(19);


/*
W1Temp.getSensorsUids().then(function (sensorsUids) {     
  console.log(sensorsUids);         
                                                             
        W1Temp.getSensor(sensorsUids).then(function (sensor) {
                                                             
        // print actual temperature                           
        var t = sensor.getTemperature();                  
//        console.log('Actual temp:', t, '..C');             
                                                     
        sensor.on('change', function(t){          
          //actualizar la temperatura global
           temp=t;                         
                                                     
        });                                                   
      });                                  
}); 
*/





var server = app.listen(8888, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
