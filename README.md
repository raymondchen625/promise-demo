# JavaScript Promise Demo
## Introduction

This is an exercise application of JavaScript Promise. 

[The official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) contains all the details.

* Sleeper:
A helper object which contains the identification of the thread and the time it will take to run
* Sleeper.sleepPromise():
It returns a Promise object for the current Sleeper obect.

There are 4 methods test1()-test4() in the application "App". Commenting others out when running any of them is recommended for clarity.
* test1(): Just create a bunch of Promise and let them run. We can see they run in parallel.
* test2(): Put the Promise objects in an array, and collect the result with Promise.all() method once all of them are finished
* test3(): A demo to pick the Promise which finishes first
* test4(): A demo for making the promises run one after another, i.e. not in parallel

## Language 
JavaScript(ES6), Node & TypeScript

## Install and run
Run with:
```
    bash run.sh
```
