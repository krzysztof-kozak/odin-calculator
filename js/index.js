import updateDisplay from "./updateDisplay.js";
import validateInput, { isOperator } from "./validateInput.js";
import verifyClickTarget from "./verifyClickTarget.js";
import operate from "./operate.js";
import clearDisplay from "./clearDisplay.js";

const calc = document.querySelector(".calc");
const display = document.querySelector(".display");
calc.addEventListener("click", handleClick);

// Only stores valid inputs.
let userIputHistory = [];
let memory = [];
let currentNumber = "";

function handleClick({ target }) {
	const isValidClickTarget = verifyClickTarget(target);

	if (!isValidClickTarget) {
		return;
	}

	if (target.value === "c") {
		userIputHistory = [];
		memory = [];
		currentNumber = "";
		clearDisplay(display);
		return;
	}

	const isValidInput = validateInput(target);

	if (!isValidInput) {
		return;
	}

	// pressed a number
	if (!isOperator(target.value) && target.value !== "=") {
		composeNumber(target.value);

		// pressed operator
	} else if (isOperator(target.value)) {
		debugger;
		if (typeof memory[memory.length - 1] !== "number") {
			memory.push(currentNumber);
		}
		memory.push(target.value);
		currentNumber = "";
	}

	if (target.classList.contains("btn-eq")) {
		debugger;
		memory.push(currentNumber);
		const result = operate(memory);
		clearDisplay(display);
		updateDisplay(display, result);
		currentNumber = memory[0];
		userIputHistory = [currentNumber];

		return;
	}

	updateDisplay(display, target.value);
	userIputHistory.push(target.value);
}

function composeNumber(digit) {
	currentNumber += digit;
}

export default userIputHistory;
