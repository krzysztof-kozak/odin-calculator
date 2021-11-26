const display = document.querySelector(".display");
const calc = document.querySelector(".calc");

calc.addEventListener("click", updateDisplay);

const userIputHistory = [];

function updateDisplay({ target }) {
	if (target.classList.contains("no-display")) {
		return;
	}

	const lastButtonPressed = userIputHistory[userIputHistory.length - 1];

	if (["+", "-", "x", "÷"].includes(target.value) && lastButtonPressed === target.value) {
		return;
	}

	display.textContent += `${target.value} `;
	userIputHistory.push(target.value);
}
