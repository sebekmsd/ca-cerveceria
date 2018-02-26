// Paramtros por defecto

var t_min, t_max = 0;


var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser")
 //   methodOverride = require("method-override");


app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());  
//app.use(methodOverride());

var router = express.Router();


var Timer = require('./timer.js');
var OmegaIFace = require('./io_iface.js');


var control = new OmegaIFace(15,20,19);
control.init();
control.initRelay();

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

//console.log(pc);

app.get('/shutdown',function(req,res){
   control.shutdown();

});


app.get('/info', function (req, res) {
  t = timer.getElapsedTime();
  console.log(t);
  
  
  m =  Math.floor( t / 60);
  s = t % 60;

   info = { elpased_time: m + 'm : ' + s +'s',
    status: timer.state() , 
    program : 'simple',
    temperature : control.temperature() ,
    io_info: control.status() };

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

  response = { id : 'time',
               state: 'OK'}
  res.json(response);
});

app.post('/relay/:action/:id',function(req,res){
  if( req.params.action === undefined || req.params.id === undefined ){
    res.status(400).send('El parametros "action" se debe especificar');
  }
  switch(req.params.action){
    case 'open':
      control.openRelay(req.params.id); break;
    case 'close':
      control.closeRelay(req.params.id); break;
  }
  res.json({ status : 'ok' });
});


app.post('/stop',function(req,res){
  if(timer != undefined ){
    timer.stop();
  }
  r = { status: 'ok' }
  res.json(r);
});


process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
   control.destroyRelay();
   process.exit();
});

var server = app.listen(8888, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
