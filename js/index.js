import updateDisplay from "./updateDisplay.js";
import validateInput, { isOperator } from "./validateInput.js";
import verifyClickTarget from "./verifyClickTarget.js";
import operate from "./operate.js";
import clearDisplay from "./clearDisplay.js";

const calc = document.querySelector(".calc");
const display = document.querySelector(".display");
calc.addEventListener("click", handleClick);

// Only stores valid inputs.
const userIputHistory = [];
let memory = [];

let currentNumber = "";

function handleClick({ target }) {
	const isValidClickTarget = verifyClickTarget(target);

	if (!isValidClickTarget) {
		return;
	}

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
		const result = operate(memory);
		clearDisplay(display);
		updateDisplay(display, result);
		memory = [result];
	}

	updateDisplay(display, target.value);
	userIputHistory.push(target.value);

	console.log(memory);
}

function composeNumber(digit) {
	currentNumber += digit;
}

export default userIputHistory;
