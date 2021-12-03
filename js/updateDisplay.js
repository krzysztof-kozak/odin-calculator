function updateDisplay(display, value) {
	if (typeof value === "object") {
		value = value.join(" ");
		display.textContent = value;
		return;
	}

	display.textContent += value;
}

export default updateDisplay;
