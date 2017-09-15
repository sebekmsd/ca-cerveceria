/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Timer = function (interval){
    this._interval = interval;
    this._timeLeft = 0;
}

Timer.prototype.timeLeft = function(){
    return this._timeLeft;
}

Timer.prototype.programIntervals = function(intervalos,callback){
    var counter = 0;

    top = intervalos.pop()

    var i = setInterval(function(){
        // do your thing

        counter++;
        console.log(counter);
        if(counter === top) {
            //check otros intervalos y reset contaod
            callback(top)
            counter = 0;
            top = intervalos.pop();
            if(top === undefined){
                clearInterval(i);
            }
            
        }
    }, 1000);
}


Timer.prototype.tick= function (callback){
    //var intrvl = this._interval;
    setInterval(function()   {
         console.log(this.i);
         if(this.i-- < 0){
            callback();
            this.unref();
         }
    }.bind({i : this._interval}),1000);
}


module.exports = Timer

