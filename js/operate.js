function operate(memory) {
	/* 
    When user presses the = button, the memory
    might look something like this:
    
    ['52', '+', '69', '=']

    We don't need that last "=" element, so let's get rid of it.
	*/
	memory.splice(-1);

	// Let's convert strings to floats.
	let [num1, operator, num2] = memory;
	num1 = parseFloat(num1, 10);
	num2 = parseFloat(num2, 10);

	const result = getResult(num1, num2, operator);

	return result;
}

function getResult(num1, num2, operator) {
	switch (operator) {
		case "+":
			return num1 + num2;

		case "-":
			return num1 - num2;

		case "x":
			return num1 * num2;

		case "÷":
			return num1 / num2;

		default:
			break;
	}
}

export default operate;
