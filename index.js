var W1Temp = require('w1temp');

var Relay = require("omega_gpio").Relay;

var rel = new Relay(3);

rol.on()


//W1Temp.setGpioPower(19);


W1Temp.setGpioPower(19);

W1Temp.getSensorsUids().then(function (sensorsUids) {
  console.log(sensorsUids);
});


W1Temp.getSensor('28-000008297749').then(function (sensor) {
 
  // print actual temperature 
  var temp = sensor.getTemperature();
  console.log('Actual temp:', temp, '°C');
 
  // print actual temperature on changed 
  sensor.on('change', function (temp) {
    console.log('Temp changed:', temp, '°C');
  });
 
});

rol.destroy()
