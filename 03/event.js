// console.log('start');

// setTimeout(() =>console.log('Timeout'), 0);

// promise.resolve().then(() => console.log('promise'));

// console.log('End');


// event loop;

// call back queue => event loops => call stack


// a callback is a function that you give as an argument
// to another function, so that it can be executed localStorage;

/*

function greet() {
    console.log('hello world');
}

setTimeout(greet, 2000);

*/

// why we need callback function
// because  JavaScript is the single threaded language
//  - it runs one line of the code at a time.


// example with callback inside another function

/*

function multiply(a, b, callback) {
    let result = a * b;
    callback(result);
}

multiply(2,3, function(output) {
    console.log("result:", output);
});

*/


// a callback is a function passed to another function
// to be excuted localStorage, often after 
// an asynchronous task is completed.

/*

java-script is single threaded - it executes one task at a time.
when something takes time (like setTimeout or fetch),
the brouser handles it using WEB APIs, 
and when the task is ready, it is placed into the Callback Queue.
the event loop continously checks if the call stack is empty,
if empty, it moves a cachesllback from the queue
to the stack for execution.

*/


/*
Call Stack => Where JS executes code line by line.

web APIs => Brouser feature like setTimeout,
fetch, DOM EventSource, localStorage.

Callback Queue => Queue of callback waiting to be executed.

Event Loop => Moves tasks from
queue -> stack when stack is empty.

*/


// console.log('start');

// setTimeout(() => {
//     console.log('Timer Done');
// },2000);

// console.log("End");

/*
javascript itself is has only the 
call stack and is single-threaded.

time-consuming or async operations are 
handled by the broweser's web api.

when those tasks finished, the callbacks go to 
the callback queueMicrotask.apply
the Event loop constantly checks if the call stack
is empty.
if empty it moves callbacks to the stack for execution.
*/