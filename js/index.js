import updateDisplay from "./updateDisplay.js";
import validateInput, { isOperator } from "./validateInput.js";

const calc = document.querySelector(".calc");
calc.addEventListener("click", handleClick);

// Only stores valid inputs.
const userIputHistory = [];
const memory = [];

/* 
	1. Build a number out of digits.
	2. Push the store the number in memory.

	If a user presses 22 + 55
	
	the memory should look like this:
	["22", "+", "55"]

	and not like this:
	["2", "2", "+", "5", "5"]
*/

let currentNumber = "";

function handleClick({ target }) {
	/* 

	TODO:

	1. Basic approach - order of operation not included.

	number1 + number2 * number3;
	(number1 + number2) * number3;
	result * number3;

	Example:
		2 + 3 * 5
		5 * 5
		25


	2. Desired approach - order of operations included.

	number1 + number2 * number3;
	number1 + (number2 * number3);
	number1 + result;

	Example:
		2 + 3 * 5
		2 + 15
		17

*/

	if (target.classList.contains("btn-eq")) {
		console.log("Operating");
		return;
	}

	const isValidInput = validateInput(target);

	if (!isValidInput) {
		return;
	}

	if (isOperator(target.value)) {
		memory.push(currentNumber);
		memory.push(target.value);

		currentNumber = "";
	} else {
		composeNumber(target.value);
	}

	updateDisplay(target);
	userIputHistory.push(target.value);

	console.log(memory);
}

function composeNumber(digit) {
	currentNumber += digit;
}

export default userIputHistory;
