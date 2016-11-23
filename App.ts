/**
 This is a exercise/demo of JavaScript Promosie class
 Sleeper: a object takes index,sleepTime(in milliseconds) for the thread's runtime and identification.
 Methods:
    sleepPromise: create a Promise for current object
 */

class Sleeper {
    constructor(public index: number, public sleepTime: number) {
        this.index = index;
        this.sleepTime = Math.round(sleepTime);
    }

    /** sleepPromise creates and returns a Promise object for the Sleeper object */
    sleepPromise(): Promise<string> {
        var i = this.index;
        var interval = this.sleepTime;
        return new
            Promise(function (resolve, reject) {
            console.log(`Promise made on #${i} with interval=${interval}`);
            setTimeout(function () {
                console.log(`Finished execution of sleeper #${i} with interval=${interval}`);
                resolve(`Waken of #${i} with interval=${interval}`);
            }, interval);
        });
    }
}

// 1. Create a bunch of Promise and let them run
test1(1,11);

// 2. A promise array which will have their result collected by Promise.all
test2(11,21);

// 3. A Promise.race example, to pick the Promise who finishes first
test3(21,31);

// 4. If we want one Promise is only made after the other finishes, we need to put the creation of the 2nd Promise in the first then() to chain them up
test4(888,999);

function test1(startIndex : number, stopIndex : number) : void {
    console.log(` -------------- A array of separate Promises with index ${startIndex}-${stopIndex-1} ... -------------- `)
    for (let i: number = startIndex; i < stopIndex; i++) {
        let interval: number = Math.random() * 5000;
        let sleeper = new Sleeper(i, interval);
        sleeper.sleepPromise();
    }
}

function test2(startIndex : number, stopIndex : number) : void {
    console.log(` -------------- Promises in an array executes in parrallel with index ${startIndex}-${stopIndex-1}, but result is collected in sequence with Promise.all -------------- `)
    let promises: Array<Promise<string>> = [];
    for (let i: number = startIndex; i < stopIndex; i++) {
        let interval: number = Math.random() * 5000;
        let sleeper = new Sleeper(i, interval);
        let currentPromise : Promise<string> = sleeper.sleepPromise();
        promises.push(currentPromise);
    }
    Promise.all(promises).then(function(results) {
        for (let r of results) {
            console.log(`Collected data: ${r}`);
        }
    })
}

function test3(startIndex : number, stopIndex : number) : void {
    console.log(` -------------- Promises in an array executes in parrallel with index ${startIndex}-${stopIndex-1}, get the one who finishes first -------------- `)
    let promises: Array<Promise<string>> = [];
    for (let i: number = startIndex; i < stopIndex; i++) {
        let interval: number = Math.random() * 5000;
        let sleeper = new Sleeper(i, interval);
        let currentPromise : Promise<string> = sleeper.sleepPromise();
        promises.push(currentPromise);
    }
    Promise.race(promises).then(function(result) {
        console.log(`First finished: ${result}`);
    })
}

function test4(firstIndex : number, sescondIndex : number) : void {
    let firstSleeper = new Sleeper(firstIndex, Math.random() * 5000);
    let secondSleeper = new Sleeper(sescondIndex, Math.random() * 5000);
    firstSleeper.sleepPromise().then(function(response) {
        console.log("firstSleeper response:"+response);
        secondSleeper.sleepPromise().then(function (response) {
            console.log("secondSleeper response:"+response);
        });
    });
}