import userIputHistory from "./index.js";

function validateInput(target) {
	const lastPressedButton = userIputHistory[userIputHistory.length - 1];
	const currentlyPressedButton = target.value;

	// 1. First valid input cannot be an operator.
	if (userIputHistory.length === 0 && isOperator(currentlyPressedButton)) {
		return false;
	}

	// 2. Cannot press operator twice in a row
	if (isOperator(lastPressedButton) && isOperator(currentlyPressedButton)) {
		return false;
	}

	// 3. First valid input cannot be a dot.
	if (userIputHistory.length === 0 && currentlyPressedButton === ".") {
		return false;
	}

	// 4. Cannot press dot twice in a row.
	if (lastPressedButton === "." && currentlyPressedButton === ".") {
		return false;
	}

	/*
		5. Cannot press an operator immediatelly followed by a dot or vice versa.
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
	if (userIputHistory.find((btn) => btn === ".") && currentlyPressedButton === ".") {
		return false;
	}

	return true;
}

export function isOperator(button) {
	return ["+", "-", "x", "÷"].includes(button);
}

export default validateInput;
