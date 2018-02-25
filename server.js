var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser")
 //   methodOverride = require("method-override");


app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());  
//app.use(methodOverride());

var router = express.Router();


var Timer = require('./timer.js');

timer = new Timer(10);

global.temp = 0;

var W1Temp = require('w1temp');
var gpio = require("omega_gpio");


app.get('/info', function (req, res) {
  t = timer.getElapsedTime();
  console.log(t);
   
  m =  Math.floor( t / 60);
  s = t % 60;

   info = { elpased_time: m + 'm : ' + s +'s', status: timer.state() , program : 'simple' };

   res.send(info);
})


app.post('/start',function(req,res){

  console.log(req.body);

  if( req.body.program !== undefined  && req.body.program == 'simple'){
    //Utilizando prorgama simple
    console.log(req.body.interval[0]);
    timer = new Timer(req.body.interval[0]);
    timer.countdown(function(){
      //Llamar a stop
      console.log('Proceso detenido');
    });
  }else{
    res.status(400).send('Parametros invalidos')
  }
  //Establecer el tiemp

  //Establecer intervalo de Check
  /*setInterval(function(){
      console.log(">>>>" + timer.getElapsedTime());
  },3000);
  */


  response = { id : 'time',
               state: 'OK'}
  res.json(response);
});


app.post('/stop',function(req,res){
  if(timer != undefined ){
    timer.stop();
  }
  r = { status: 'ok' }
  res.json(r);
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
