////How to Convert Object to array in Angular 4? - Stack Overflow
// const persons = {
//   john: { age: 23, year: 2010 },
//   jack: { age: 22, year: 2011 },
//   jenny: { age: 21, year: 2012 },
// };
// const resultArray = Object.keys(persons).map((index) => {
//   let person = persons[index];
//   return person;
// });

// console.log(resultArray);


// // [ { age: 23, year: 2010 },
// //   { age: 22, year: 2011 },
// //   { age: 21, year: 2012 } ]
//////////////////////////////////////
// const obj = { 5.0: 10, 28.0: 14, 3.0: 6 };

// const mapped = Object.keys(obj).map((key) => ({ type: key, value: obj[key] }));

// console.log(mapped);

// //How to Convert Array to objects?
// var array = [{ Kiran: "30" }, { Tom: "50" }],
//   object = Object.assign({}, ...array);
// console.log(object);

var d = new Date('2021-09-30T00:00:00');
var today = d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);
console.log(d);
console.log(today);

