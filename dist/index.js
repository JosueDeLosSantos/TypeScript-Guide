"use strict";
// type vs interface
/* TS can infer the types of the following variables */
const someNumber = 5;
const someString = "something";
const user = {
    name: someString,
    age: someNumber
};
const usersArr = ["jhon", 'jana', "jade"];
const agesArr = [25, 30, 50];
const someBoolean = false;
/* If TS cannot infer a type you can use a type or interface */
const user2 = {
    name: "Jhon",
    age: 25
};
const user3 = {
    name: "Jhon",
    age: 25
};
console.log(user);
