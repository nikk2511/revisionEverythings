// const car = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW"];

// createOrder(cart, function(orderId) {
//         prceedToPayment(orderId) 
// });


// const promise = crateOrder(cart);

// //{date: undefined} -> {data: orderdetails} with the help of promise


// promise.then(function(orderId) {
//         prceedToPayment(orderId) 
// });

// In JavaScript, a Promise is an object that represents
//  the eventual completion (or failure) of an asynchronous operation
//  and its resulting value.

// Definition (simple)

// A Promise is a placeholder for a value 
// that will be available in the future — either
//  the result of an async task or an error if it fails.


const GITHUB_API = "https://api.github.com/users/nikk2511";

const user = fetch(GITHUB_API);

console.log(user);

let promise = new Promise((resolve, reject) => {
  // asynchronous operation
  if (success) {
    resolve("Operation successful");
  } else {
    reject("Error occurred");
  }
});


let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data fetched successfully!");
  }, 2000);
});

myPromise.then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});










