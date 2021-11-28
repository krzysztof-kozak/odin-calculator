import updateDisplay from "./updateDisplay.js";
import validateInput, { isOperator } from "./validateInput.js";
import operate from "./operate.js";

const calc = document.querySelector(".calc");
calc.addEventListener("click", handleClick);

// Only stores valid inputs.
const userIputHistory = [];
let memory = [];

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

	const isValidInput = validateInput(target);

	if (!isValidInput) {
		return;
	}

	if (isOperator(target.value) || target.value === "=") {
		memory.push(currentNumber);
		memory.push(target.value);

		currentNumber = "";
	} else {
		composeNumber(target.value);
	}

	if (target.classList.contains("btn-eq")) {
		operate(memory);
		memory = [];
	}

	updateDisplay(target);
	userIputHistory.push(target.value);
}

function composeNumber(digit) {
	currentNumber += digit;
}

export default userIputHistory;
