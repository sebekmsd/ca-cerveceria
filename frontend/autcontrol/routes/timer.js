/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Timer = function (interval){
    this._interval = interval;
    this._timeLeft = 0;
    this._elapsedTime=0;
    this._state = 'stopped';
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


Timer.prototype.getElapsedTime= function(){
    return this._elapsedTime;
}

Timer.prototype.stop = function(){
    clearInterval(this._intervalId);
}

Timer.prototype.state = function(){
    return this._state;
}

Timer.prototype.countdown= function (callback){
    //var intrvl = this._interval;
    this._state = 'running';
    this._intervalId = setInterval(function()   {
        this.main._elapsedTime++ 

        //console.log(this.main._interval);
         if(this.main._interval-- <= 0){
            callback();
            this.main._state='stopped';
            clearInterval(this.main._intervalId)
         }
    }.bind({ main : this }),1000);
    //console.log('Interval id ' + this._intervalId);
}

Timer.prototype.interval=function(interval, callback){
    setInterval(callback,interval)
}

module.exports = Timer

