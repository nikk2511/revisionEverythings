// for (let i = 0 ; i< 5; i++) {
//     console.log("nikhil")

// }

// for (let i = 0; i<5; i++) {
//     for (let j = 0; j<5; j++) {

//     }
//}



// for (let i = 0 ; i < 3 ; i++) {
//     for (let j = 0 ; j < 3 ; j++) {
//         console.log(`i = ${i} , j = ${j}`);
//     }
// }



// for (let  i = 0; i<4; i++)  {
//     for (let j = 0; j<4; j++) {
//         console.log("*")

//     }
// };


// for (let  i = 0; i<4; i++) {
//     let row = " ";
//     for (let j = 0; j<4; j++) {
//         row = row + "* ";
//     }
//     console.log(row);
// }

//  * * * * 
//  * * * * 
//  * * * *
//  * * * *


// let n = 4;

// for (let  i = 0; i<n; i++) {
//     let row = " ";
//     for (let j = 0; j<n; j++) {
//         row += "* ";
//     }
//     console.log(row);
// };


// let n = 10;

// for (let i = 0; i <n ; i++) {
//     let row = "";
//     for (let j = 0; j<=i; j++) {
//         row = row + "* ";
//     }
// console.log(row);
// }

// let n = 5;

// for (let  i =0; i<n; i++) {

//     for (let j = 0; j <= n; j++) {
        
//     }   
// }

// let n = 5;

// for ( let  i= 0; i<n ; i++ ){
//     let row = " ";

//     for(let j = 0; j<= i; j ++) {
//         row += (j+1) + " ";
//     }

//     console.log(row)
// }

// let  n= 5;

// for (let  i = 0; i<n ;i++) {
//     let row = " ";

//     for (let j = 0; j<= i; j++) {
//         row += (i+1) + " ";
//     }
//     console.log(row);
// }


// let n = 5;

// for (let  i=n-1; i>=0; i--) {
//     let row = " ";

//     for (let j=0; j<=i; j++) {
//         row += (j+1) + " ";
//     }
//     console.log(row);
// };



// let n = 5;

// for (let i = n-1; i>=0; i--) {
//     let row = " ";

//     for (let j = 0; j <=i; j++) {
//         row += (i+1) +" ";
//     }

//     console.log(row);
// }


// let  n = 5;

// for (let i = n-1; i>=0; i--) {
//     let row = " ";



//     for (let j = 0; j<=i; j++) {
//         row += "* ";
//     }

//     console.log(row);
// }


// let  n = 5;

// for (let i = 0; i<n; i++) {
//     let row = "";



//     for (let j = 0; j<n-(i+1); j++) {
//         row += " ";
//     }

//     for (let k = 0; k<i+1; k++) {
//         row += "*";
//     }

//     console.log(row);
// }

//     *
//    **
//   ***
//  ****
// *****

// let n = 5;
// for (let i = 0; i < n; i++) {
//     let row = " ";
//      let sw = 1;

//     for (let j = 0; j < i+1; j++) {
//         row = row + sw;
//         if  (sw == 1) {
//             sw = 0;
//         }   
//         else {
//             sw = 1;

//         }
//     }
// console.log(row);

// }
//   1
//   10
//   101
//   1010
//   10101




// let n = 5;

// for (let i = 0; i < n; i++) {
//     let row = "";
//     let sw = 1; // renamed from 'switch' (reserved keyword)

//     for (let j = 0; j <= i; j++) {
//         row += sw + " ";
//         // toggle between 1 and 0
//         sw = (sw === 1) ? 0 : 1;
//     }

//     console.log(row);
// }




// let n = 5;
// for (let i = 0; i < n; i++) {
//     let row = " ";
//       let sw = 0;

//     for (let j = 0; j < i+1; j++) {
//         row = row + sw;
//         if  (sw == 1) {
//             sw = 0;
//         }   
//         else {
//             sw = 1;

//         }
//     }
// console.log(row);

// }
//  0
//  01
//  010
//  0101
//  01010





// let n = 5;

// let sw = 1;

// for (let i = 0; i < n; i++) {
//     let row = " ";

//     for (let j = 0; j < i+1; j++) {
//         row = row + sw;
//         if  (sw == 1) {
//             sw = 0;
//         }   
//         else {
//             sw = 1;

//         }
//     }
// console.log(row);

// }

//  1
//  01
//  010
//  1010
//  10101


