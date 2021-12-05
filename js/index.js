import updateDisplay from "./updateDisplay.js";
import updateHistory from "./updateHistory.js";
import validateInput, { isOperator } from "./validateInput.js";
import verifyClickTarget from "./verifyClickTarget.js";
import operate from "./operate.js";
import clearDisplay from "./clearDisplay.js";

const calc = document.querySelector(".calc");
const mainDisplay = document.querySelector(".display > .main");
const topDisplay = document.querySelector(".display > .top");
const history = document.querySelector(".history");
const btnC = document.querySelector(".btn-c");
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
		clearDisplay(topDisplay);
		clearDisplay(history);
		return;
	}

	if (target.value === "ce") {
		const config = { startingIndex: -1, deleteCount: 1 };
		const prevMemory = [...memory];

		if (currentNumber) {
			updateConfig(config, currentNumber);
			if (currentNumber === prevMemory.at(-1)) {
				memory.pop();
			}
			removeLastDigit();
		} else {
			memory.pop();
			currentNumber = isOperator(memory.at(-1)) ? "" : memory.at(-1);
		}

		userIputHistory.pop();
		clearDisplay(mainDisplay, config);

		if (memory.length === 0 && currentNumber.length === 0) {
			btnC.value = "c";
			btnC.textContent = "c";
		}

		return;
	}

	if (currentNumber === "Invalid operation") {
		clearDisplay(mainDisplay);
	}

	const isValidInput = validateInput(target.value, currentNumber);

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
		// entered a new number, previous result is removed
		if (memory.length === 1 || currentNumber === "Invalid operation") {
			memory = [];
			currentNumber = "";
			clearDisplay(mainDisplay);
		}
		composeNumber(target.value);

		// pressed an operator
	} else if (isOperator(target.value)) {
		if (typeof memory[memory.length - 1] !== "number") {
			memory.push(currentNumber);
		}
		memory.push(target.value);
		currentNumber = "";
	}

	if (target.classList.contains("btn-eq")) {
		if (currentNumber && !isNumber(memory.at(-1))) {
			memory.push(currentNumber);
		}

		if (currentNumber && isNumber(memory.at(-1)) && currentNumber !== memory.at(-1)) {
			memory.pop();
			memory.push(currentNumber);
		}

		const memoryBeforeOperation = [...memory];

		const isValidOperation = memory.every((el) => el !== "") && memory.length >= 3;

		if (!isValidOperation) {
			memory = [""];
			currentNumber = "Invalid operation";

			clearDisplay(mainDisplay);
			updateDisplay(mainDisplay, "Invalid operation");

			return;
		}

		// valid input ["5", "+", "2"]
		// invalid input ["5", "+", "2", "+"]
		if (memory.length % 2 === 0) {
			return;
		}

		updateDisplay(topDisplay, memory);

		const result = operate(memory);
		clearDisplay(mainDisplay);
		updateDisplay(mainDisplay, result);
		currentNumber = memory[0];
		userIputHistory = [currentNumber];

		updateHistory(memoryBeforeOperation, result);

		return;
	}

	userIputHistory.push(target.value);
	const isConstructingNegativeNumber = currentNumber.includes("-");

	updateDisplay(mainDisplay, target.value, isConstructingNegativeNumber);

	if (memory.length > 1 || currentNumber.length > 1) {
		btnC.value = "ce";
		btnC.textContent = "ce";
	} else {
		btnC.value = "c";
		btnC.textContent = "c";
	}
}

function composeNumber(digit) {
	currentNumber += digit;
}

function removeLastDigit() {
	currentNumber = [...currentNumber.toString()];

	let deleteCount = 1;
	let startingIndex = -1;

	// if last number is negative, delete both the digit and the minus sign/
	// e.g. to remove "2", delete count and needs to be 1, and starting index -1.
	// e.g. to remove "-2", delete count needs to be 2, and starting index -2.

	// example input/output ["6", "5"] -> "6"
	// example input/output ["2"] -> ""
	// example input/output ["-8"] -> ""

	if (currentNumber.at(-2) === "-") {
		deleteCount = 2;
		startingIndex = -2;
		userIputHistory.pop();
	}

	currentNumber.splice(startingIndex, deleteCount);
	currentNumber = currentNumber.join("");
}

function isNumber(element) {
	return !Number.isNaN(parseInt(element, 10));
}

function updateConfig(config, currentNumber) {
	if (Number(currentNumber) < 0 && currentNumber.length > 2) {
		config.startingIndex = -2;
	}

	if (Number(currentNumber) < 0 && currentNumber.length <= 2) {
		config.startingIndex = -4;
		config.deleteCount = 4;
	}
}

export { userIputHistory, memory, history };
