function updateDisplay(display, value) {
	if (value === "=") {
		return false;
	}
	display.textContent += value;
}

export default updateDisplay;
