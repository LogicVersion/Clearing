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

const currentMonth = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
console.log(months[currentMonth.getMonth()]);

dt=new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});
var d = new Date();
var today = d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);
console.log(today);
console.log(dt);
console.log(d);

zt=new Date().toLocaleDateString(); //toDateString()
console.log(zt);

// toLocaleDateString();
// toLocaleDateString(locales);
// toLocaleDateString(locales, options);

const currentDate = new Date();

console.log(currentDate.toISOString());


const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

console.log(currentDate.toLocaleDateString('en-US', options));
//Freitag, 2. Juli 2021

console.log(currentDate.toLocaleDateString('ar-EG', options))
// الجمعة، ٢ يوليو ٢٠٢١





