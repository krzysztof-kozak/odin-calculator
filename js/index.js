import updateDisplay from "./updateDisplay.js";
import validateInput, { isOperator } from "./validateInput.js";
import verifyClickTarget from "./verifyClickTarget.js";
import operate from "./operate.js";
import clearDisplay from "./clearDisplay.js";

const calc = document.querySelector(".calc");
const mainDisplay = document.querySelector(".display > .main");
const topDisplay = document.querySelector(".display > .top");
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
		clearDisplay(mainDisplay);
		return;
	}

	const isValidInput = validateInput(target);

	if (!isValidInput) {
		return;
	}
	// pressed a number (or a minus sign for a negative number)
	if (
		(!isOperator(target.value) && target.value !== "=") ||
		(userIputHistory.length === 0 && target.value === "-") ||
		(isOperator(memory[memory.length - 1]) &&
			target.value === "-" &&
			(currentNumber === "" || currentNumber === "-"))
	) {
		composeNumber(target.value);

		// pressed operator
	} else if (isOperator(target.value)) {
		if (typeof memory[memory.length - 1] !== "number") {
			memory.push(currentNumber);
		}
		memory.push(target.value);
		currentNumber = "";
	}

	if (target.classList.contains("btn-eq")) {
		memory.push(currentNumber);
		updateDisplay(topDisplay, memory);
		const result = operate(memory);
		clearDisplay(mainDisplay);
		updateDisplay(mainDisplay, result);
		currentNumber = memory[0];
		userIputHistory = [currentNumber];

		return;
	}

	userIputHistory.push(target.value);
	updateDisplay(mainDisplay, target.value);
}

function composeNumber(digit) {
	currentNumber += digit;
}

export { userIputHistory, memory };
