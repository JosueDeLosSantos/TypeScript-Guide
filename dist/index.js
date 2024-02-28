"use strict";
// type vs interface
const stringExample = "example";
const numberExample = 50;
const objectExample = { name: "Mary" };
const objectExample2 = { age: 35 };
const objectExample3 = { age: 35, name: "Bet" };
const objectExample4 = { name: "Ed", age: 60 };
window.test = "example";
console.log(window); // test property was added to window object built in JS
/* Main takeaway: type is more versatile */
/* TS can infer the types of the following variables */
const someNumber = 5;
const someString = "something";
const user = {
    name: someString,
    age: someNumber,
};
const usersArr = ["jhon", "jana", "jade"];
const agesArr = [25, 30, 50];
const someBoolean = false;
/* If TS cannot infer a type you can use a type or interface */
const user2 = {
    name: "Jhon",
    age: 25,
};
const user3 = {
    name: "Jhon",
    age: 25,
};
console.log(user);
/* ---------------------------------------------------------------------------------------- */
/* GENERIC FUNCTION BASICS */
function getFirstElement(array) {
    return array[0];
}
const firstNum = getFirstElement(agesArr); // ok
const firstName = getFirstElement(usersArr); // Error because the function only accepts type number[]
/* In the following example no errors will be found
because I clearly stated that the function takes number[] or string[] */
function getSecondElement(array) {
    return array[2];
}
const firstNum2 = getSecondElement(agesArr); // ok
const firstName2 = getSecondElement(usersArr); // ok
/* If you have a function that has some type of data inside of it
where you want that data to be changin its type based on what you
pass in, or based on what you return, that is the perfect case for a
generic. */
function getThirdElement(array) {
    return array[3];
}
/*
If you had a function with multiple arguments, it would be possible
to pass in more generic types like:

function getThirdElement<SomeData, SomeMoreData>(array: SomeData[], secondArray: SomeMoreData[]) {
    return array[3] + secondArray[1];
}
 */
const firstNum3 = getThirdElement(agesArr); // ok
const firstName3 = getThirdElement(usersArr); // ok
const response = {
    data: { name: "josh", age: 20 }, // Type any isn't ideal
    isError: false,
};
// data passed in
const response2 = {
    data: { name: "josh", age: 20 },
    isError: false,
};
const response3 = {
    // On here i get an error until I remove name and age and add title
    data: { name: "josh", age: 20 },
    isError: false,
};
// on here I get an error because string does not extend object
const response4 = {
    data: "some data",
    isError: false,
};
// the following respect the rules
const response5 = {
    data: { name: "john" },
    isError: false,
};
const response6 = {
    data: { status: 200 },
    isError: false,
};
// this is out of the topic but it's interesting for debugging
/* Style your console logs by using '%c' */
console.log(`%c${firstNum}`, "font-size: 25px; color: orange");
