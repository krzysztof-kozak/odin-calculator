import updateDisplay from "./updateDisplay.js";
import validateInput from "./validateInput.js";

const calc = document.querySelector(".calc");
calc.addEventListener("click", handleClick);

// Only stores valid inputs.
const userIputHistory = [];

function handleClick({ target }) {
	// TODO: imlement an operate function.
	if (target.classList.contains("btn-eq")) {
		console.log("Operating");
		return;
	}

	const isValidInput = validateInput(target);

	if (!isValidInput) {
		return;
	}

	userIputHistory.push(target.value);

	updateDisplay(target);
	console.log(userIputHistory);
}

export default userIputHistory;
