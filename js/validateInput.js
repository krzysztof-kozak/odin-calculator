import { userIputHistory, memory } from "./index.js";

function validateInput(target) {
	const lastPressedButton = userIputHistory[userIputHistory.length - 1];
	const currentlyPressedButton = target.value;

	// Allow user to start with a negative number
	if (userIputHistory.length === 0 && currentlyPressedButton === "-") {
		return true;
	}

	// Disallow user to use three minus operators in a row, e.g "5 - - 5" is valid but "5 - - - 5" is not.
	if (
		userIputHistory[userIputHistory.length - 1] === "-" &&
		userIputHistory[userIputHistory.length - 2] === "-" &&
		currentlyPressedButton === "-"
	) {
		return false;
	}

	// Allow user to input negative numbers later in the chain
	if (isOperator(memory[memory.length - 1]) && currentlyPressedButton === "-") {
		return true;
	}

	// First valid input cannot be an operator (unless it's a minus).
	if (userIputHistory.length === 0 && isOperator(currentlyPressedButton)) {
		return false;
	}

	// Cannot press operator twice in a row
	if (isOperator(lastPressedButton) && isOperator(currentlyPressedButton)) {
		return false;
	}

	// First valid input cannot be a dot.
	if (userIputHistory.length === 0 && currentlyPressedButton === ".") {
		return false;
	}

	// Cannot press dot twice in a row.
	if (lastPressedButton === "." && currentlyPressedButton === ".") {
		return false;
	}

	/*
	 Cannot press an operator immediatelly followed by a dot or vice versa.
	Examples:
		2.5 + .25 -> invalid.
		2. + 2.5 -> invalid.
	*/
	if (lastPressedButton === "." && isOperator(currentlyPressedButton)) {
		return false;
	}

	if (isOperator(lastPressedButton) && lastPressedButton === ".") {
		return false;
	}

	/*
	6. Only one dot per number.
	Examples:
		0.255 -> valid.
		0.255.5 -> invalid.
    */
	if (memory[memory.length - 1] === "." && currentlyPressedButton === ".") {
		console.log(memory);
		return false;
	}

	return true;
}

export function isOperator(button) {
	return ["+", "-", "x", "÷"].includes(button);
}

export default validateInput;
