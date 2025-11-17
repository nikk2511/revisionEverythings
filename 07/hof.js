// const radius = [3,1,2,4];

// const calculateArea = function (radius) {
//     const output = [];

//     for (i = 0; i<radius.length; i++) {
//         output.push( Math.PI *radius[i] * radius[i]);
//     }
//     return output;
// };

// console.log(calculateArea(radius));

// const cicumference = function (radius) {
//     const output = [];

//     for (i = 0; i<radius.length; i++) {
//         output.push(2 * Math.PI * radius[i]);
//     }
//     return output;
// };

// console.log(cicumference(radius));

// const diameter = function (radius) {
//     const output = [];

//     for (i = 0; i<radius.length; i++) {
//         output.push( 2 * radius[i]);
//     }
//     return output;
// };

// console.log(diameter(radius));

const radius = [3,1,2,4]

const area = function (radius) {
    return Math.PI * radius * radius;
};

const cicumference = function (radius) {
    return 2 * Math.PI * radius;
};

const diameter = function (radius) {
    return 2 * radius;
};

Array.prototype.calculate = function (logic) {
    const output = [];
    for (let i = 0; i<this.length; i++) {
        output.push(logic(this[i]));
    }
    return output;
}

console.log(radius.map(area));

console.log(radius.calculate(area));
// console.log(calculate(radius, cicumference));
// console.log(calculate(radius, diameter));

