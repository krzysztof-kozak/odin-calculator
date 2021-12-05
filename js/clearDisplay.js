function clearDisplay(display, config) {
	/* 
	config object looks like this:
		{
			startingIndex: integer
			deleteCount: integer,
		}
	*/

	if (config) {
		const index = config.startingIndex;
		const deleteCount = config.deleteCount;

		const copy = [...display.textContent];
		copy.splice(index, deleteCount);

		display.textContent = copy.join("");
		return;
	}

	display.textContent = "";
}

export default clearDisplay;
