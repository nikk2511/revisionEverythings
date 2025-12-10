// const coding = ['js', 'py', 'java', 'cpp', 'rb', 'go', 'rs', 'ts', 'cs', 'php'];

// const value = coding.forEach( (item) => {
//   console.log(item);
//   return item;
// } );

// console.log(value); 

const myNums = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// const newNums = myNums.filter ( (num) => num > 40 )

const newNums = [];

myNums.forEach( (num) => {
    if (num > 40) {
        newNums.push(num);
    }
})
console.log(newNums);

