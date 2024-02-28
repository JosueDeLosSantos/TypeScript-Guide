// type vs interface

type UserType = {
	name: string;
	age: number;
};

/* interfaces can only be used to define the types for an object */
interface UserInter {
	// You can't use the '=' with interface
	name: string;
	age: number;
}

/* If you want to declare something that is not an object you need to use type */
type SType = string | number; // type allows the union of multiple types whereas interface does not
type ObjectType = { name: string } | { age: number };
type ObjectType2 = { name: string } & { age: number };
const stringExample: SType = "example";
const numberExample: SType = 50;
const objectExample: ObjectType = { name: "Mary" };
const objectExample2: ObjectType = { age: 35 };
const objectExample3: ObjectType = { age: 35, name: "Bet" };
const objectExample4: ObjectType2 = { name: "Ed", age: 60 };

/* the only real advantage interface has over type is that it can extend on the 
existing features inside of JS */

interface Window {
	test: string;
}

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
const user2: UserInter = {
	name: "Jhon",
	age: 25,
};

const user3: UserType = {
	name: "Jhon",
	age: 25,
};

console.log(user);

/* ---------------------------------------------------------------------------------------- */

/* GENERIC FUNCTION BASICS */

function getFirstElement(array: number[]) {
	return array[0];
}

const firstNum = getFirstElement(agesArr); // ok

const firstName = getFirstElement(usersArr); // Error because the function only accepts type number[]

/* In the following example no errors will be found
because I clearly stated that the function takes number[] or string[] */

function getSecondElement(array: number[] | string[]) {
	return array[2];
}

const firstNum2 = getSecondElement(agesArr); // ok

const firstName2 = getSecondElement(usersArr); // ok

/* If you have a function that has some type of data inside of it 
where you want that data to be changin its type based on what you 
pass in, or based on what you return, that is the perfect case for a
generic. */

function getThirdElement<SomeData>(array: SomeData[]) {
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

/* 
if TS is not smart enough to infer the data type
you can manually pass this in when you call a function
example:

const firstNum3 = getThirdElement<number>(agesArr);
*/

/* ------------------------------------------------------------------------------------------ */

/* GENERIC TYPE BASICS */

type ApiResponse = {
	data: any; //This isn't ideal
	isError: boolean;
};

const response: ApiResponse = {
	data: { name: "josh", age: 20 }, // Type any isn't ideal
	isError: false,
};

// with generics:

// this data type will be inferred from the data that I pass in below
type ApiResponse2<Data> = {
	data: Data;
	isError: boolean;
};
// data passed in
const response2: ApiResponse2<{ name: string; age: number }> = {
	data: { name: "josh", age: 20 },
	isError: false,
};

/* 
or you could do the following which is easier to read:

type UserResponse = ApiResponse2<{ name: string; age: number }>

const response2: UserResponse = {
	data: { name: "josh", age: 20 },
	isError: false,
};
*/

// I could use the same generic to build more generics
type BlogResponse = ApiResponse2<{ title: string }>;

const response3: BlogResponse = {
	// On here i get an error until I remove name and age and add title
	data: { name: "josh", age: 20 },
	isError: false,
};

/* 

it accepts default values

type ApiResponse<Data = {status: number}> = {
	data: Data;
	isError: boolean;
};

this is ok:

const response2: ApiResponse = {
	data: { status: 200 },
	isError: false,
};

you can pass along any values if I don't want the default values

const response2: ApiResponse<{name: string}> = {
	data: { name: "some name" },
	isError: false,
};

or 

const response2: ApiResponse<string> = {
	data: "some data",
	isError: false,
};

*/

/* one of the major things we can do with generics is 
that we can give them a type that they must adhere to*/

type ApiResponse4<Data extends object> = {
	data: Data;
	isError: boolean;
};

// on here I get an error because string does not extend object
const response4: ApiResponse4<string> = {
	data: "some data",
	isError: false,
};
// the following respect the rules
const response5: ApiResponse4<{ name: string }> = {
	data: { name: "john" },
	isError: false,
};

// I can combine that together with default values

type ApiResponse5<Data extends object = { status: number }> = {
	data: Data;
	isError: boolean;
};

const response6: ApiResponse5 = {
	data: { status: 200 },
	isError: false,
};

// this is out of the topic but it's interesting for debugging
/* Style your console logs by using '%c' */
console.log(`%c${firstNum}`, "font-size: 25px; color: orange");
