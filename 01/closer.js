// closure = A function defined inside of another function,

//          the inner function has access to the variables.
//          and the scope of the outer function.
//          Allow for private variables and state maintenance.
//          used frequently in javascript freamworks: React, vue, angular.A


// function outer() {

//     let message = "Hello";

//     function inner() {
//         console.log(mesaage);
//     }

//     inner();
// }

// message ="goodbye";

// outer();


// function createCounter() {

//     let count = 0;

//     function increment() {

//     count++;
//     console.log('count increased to ${count}');
//     }

//     function getcount() {
//         return count;
//     }

//     return {increment, getCount};

// }

// const counter = createCounter();

// counter.increment();

// counter.increment();
// counter.increment();
// counter.increment();

// console.log('the current count is: ${counter.getCount()}');



// counter.count = 0;

// console.log(count);

function createGame() {
    let score = 0;

function increaseScore(points) {
    score += points;
    console.log('+${score}pts');
}

function decraseScore(points) {
    score -= points;
    console.log('-${score}pts');
}


function getscore() {
    return score; 
}
return {increaseScore, decraseScore, getscore};
};


const game = createGame();


// score = 100000;



game.increaseScore(5)
game.increaseScore(10)
game.decraseScore(3)

console.log(`Final Score: ${getscore()}pts`);

