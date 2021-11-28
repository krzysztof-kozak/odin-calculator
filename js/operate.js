function operate(memory) {
	const result = calculateAllSubOperations(memory);
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

// [2 + 5 x 10 + 25 - 5 + 20 ÷ 4 x 2 + 1] -> 83

function calculateAllSubOperations(memory) {
	// This is a recursive function, see the bottom line.
	if (memory.length === 1) {
		return memory[0];
	}

	// Search for multiplication or division operation first.
	let operator = memory.find((element) => element === "x" || element === "÷");

	// If not found, search for addition or subtraction operation.
	if (!operator) {
		operator = memory.find((element) => element === "+" || element === "-");
	}

	// Now that we have the idnex of the operator...
	const operatorIndex = memory.indexOf(operator);

	// ...let's get the numbers to operate on
	const num1 = parseFloat(memory[operatorIndex - 1]);
	const num2 = parseFloat(memory[operatorIndex + 1]);

	const operationResult = getResult(num1, num2, operator);

	/* 
	Now that we have operated, lets update our memory.

	Example:

	starting point: [5 + 2 x 10].
	end point: [5 + 20].
	*/
	memory.splice(operatorIndex - 1, 3, operationResult);

	// Run the function recursively, until all sub-operation are resolved.
	return calculateAllSubOperations(memory);
}

export default operate;
