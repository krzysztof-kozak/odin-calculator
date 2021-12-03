import { userIputHistory, memory } from "./index.js";

let isConstructingNegativeNumber = false;

function updateDisplay(display, value) {
	/* 
	put negative numbers into parenthesis, e.g.:
	9 - -5 becomes 9 - (-5)
	9 x -5 becomes 9 x (-5) 
	*/
	if (typeof value === "object") {
		value = value.map((el) => (el = isNegative(el) ? `(${el})` : el)).join(" ");
		display.textContent = value;
		return;
	}

	// dynamicaly put negative numbers int parenhesis as they are being constructed
	const previousInput = userIputHistory.at(-2);
	if (isOperator(previousInput) && value === "-") {
		isConstructingNegativeNumber = true;
		display.textContent = [...display.textContent, "(", value, ")"].join("");
		return;
	}

	if (memory.at(-1) !== "-") {
		isConstructingNegativeNumber = false;
	}

	if (isConstructingNegativeNumber && !isOperator(value)) {
		const copy = [...display.textContent];
		copy.splice(-1, 0, value).join("");
		display.textContent = copy.join("");
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

export function isNegative(el) {
	return el.length > 1 && el.includes("-");
}

export default updateDisplay;
