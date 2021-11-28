function updateDisplay(display, value) {
	// TODO: refactor code, so I don't need to do ANY checks here.
	// Ideally, the value passed to this function should already be valid.
	if (value === "=") {
		return false;
	}
	display.textContent += value;
}

export default updateDisplay;
