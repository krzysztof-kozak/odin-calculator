function operate(memory) {
	/* 
    When user presses the = button, the memory
    might look something like this:
    
    ['52', '+', '69', '=']

    We don't need that last "=" element, so let's get rid of it.
	*/
	memory.splice(-1);

	// Let's convert strings to floats.
	// let [num1, operator, num2] = memory;
	// num1 = parseFloat(num1, 10);
	// num2 = parseFloat(num2, 10);

	// const result = getResult(num1, num2, operator);

	// return result;

	console.log(memory); // ['5', '+', '2', 'x', '10']

	/*

	For now assume the memory will always be" num1 + num2 x num3

	0. starting memory: ['5', '+', '2', 'x', '10']

	1. Find all operators.
		+ -> index 1.
		x -> index 3.

	2. Respect order of operations and calculate.
		2.1 'x' should go first

		2.2 find elements next to x:
			'2' -> index x - 1
			'10' -> index x + 1

		2.3 replace 2, x, 10 with the result 20.
			updated memory: ['5', '+', 20].

		2.4 '+' should go second

		2.5 find elements next to +:
			'5' -> index '+' - 1
			20 -> index '+' + 1

		2.6 replace 5, +, 20 with the result 25.
			updated memory: [25]

	3. Return result

	*/

	// 1.
	const timesIndex = memory.indexOf("x");
	console.log({ timesIndex });

	const multiplicationResult = getResult(
		parseFloat(memory[timesIndex - 1]),
		parseFloat(memory[timesIndex + 1]),
		"x"
	);

	console.log({ multiplicationResult });

	memory.splice(timesIndex - 1, 3, multiplicationResult);
	console.log("memory after multiplication operation: " + memory);

	const plusIndex = memory.indexOf("+");
	console.log({ plusIndex });

	const additionResult = getResult(
		parseFloat(memory[plusIndex - 1]),
		parseFloat(memory[plusIndex + 1]),
		"+"
	);

	console.log({ additionResult });

	memory.splice(plusIndex - 1, 3, additionResult);
	console.log("memory after addition operation: " + memory);

	return memory;
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
