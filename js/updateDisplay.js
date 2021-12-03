import { userIputHistory } from "./index.js";

let isConstructingNegativeNumber = false;

function updateDisplay(display, value) {
	if (typeof value === "object") {
		value = value.join(" ");
		display.textContent = value;
		return;
	}

	/* 
	put negative numbers into parenthesis, e.g.:
	9 - -5 becomes 9 - (-5)
	9 x -5 becomes 9 x (-5) 
	*/
	const previousInput = userIputHistory.at(-2);
	if (isOperator(previousInput) && value === "-") {
		value = `(${value}`;
		isConstructingNegativeNumber = true;
	}

	if (isConstructingNegativeNumber && isOperator(value)) {
		value = `)${value}`;
		isConstructingNegativeNumber = false;
	}

	display.textContent += value;
}

function isOperator(value) {
	return ["+", "-", "x", "÷"].includes(value);
}

export default updateDisplay;
