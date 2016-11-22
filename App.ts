/**
 This is a exercise/demo of JavaScript Promosie class
 Sleeper: a object takes index,sleepTime(in milliseconds) to construct.
    When its sleepSync() method is called, it blocks the thread for the time of {sleepTime} and return a string indicating its identity
    When its sleepAsync(index,interval,resolve) method is called, it pass the parameters to setTimeout and calls resolve with a response string with index and interval inside
 */

class Sleeper {
    constructor(public index : number, public sleepTime : number) {
        this.index=index;
        this.sleepTime=Math.round(sleepTime);
    }

    sleepSync() : string {
        let start = new Date().getTime();
        while (true) {
            if ((new Date().getTime() - start) > this.sleepTime){
                break;
            }
        }
        return `Sleeper #${this.index} woke up in ${this.sleepTime} milliseconds `;
    }

    sleepAsync(index,interval,resolve) : void {
        setTimeout(function() {
            console.log(`Finished execution of sleeper #${index} with interval=${interval}`);
            resolve(`Result of sleeper #${index} with interval=${interval}`);
        },interval);
    }
}

let totalThreads : number=10;

// Run it sequentially

for (let i=0;i<totalThreads;i++) {
    let interval : number=Math.random()*3000;
    let sleeper=new Sleeper(i,interval);
    console.log(sleeper.sleepSync());
}




// Use a Promise array

let promises : Array<Promise> =[];
let sleeperResolve=function (response) {
    console.log(`Info: ${response}`);
};
for (let i=0;i<totalThreads;i++) {
    promises.push(new Promise(function(resolve,reject) {
        let interval : number=Math.random()*5000;
        let sleeper=new Sleeper(i,interval);
        sleeper.sleepAsync(i,sleeper.sleepTime,sleeperResolve);
        console.log(`Making promise #${i} with interval=${sleeper.sleepTime}`);
    }).then(function(response) {
            console.log(`Info: ${response}`);
        }, function(err) { }
    ));
}
