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
		isConstructingNegativeNumber = true;
		display.textContent = [...display.textContent, "(", value, ")"].join(" ");
		return;
	}

	if (isConstructingNegativeNumber && !isOperator(value)) {
		const copy = display.textContent.split(" ");
		copy.splice(-1, 0, value).join(" ");
		display.textContent = copy.join(" ");
		return;
	}

	if (isConstructingNegativeNumber && isOperator(value)) {
		isConstructingNegativeNumber = false;
	}

	display.textContent += value;
}

function isOperator(value) {
	return ["+", "-", "x", "÷"].includes(value);
}

export default updateDisplay;
