const display = document.querySelector(".display");

function updateDisplay(target) {
	/* 	 
    Prevents "C" button from displaying on screen.
    Prevents "=" button from displaying on screen.
    Prevents errors when the target is not a button (e.g. user clicks on the edge of the calc).
    */
	const isValidClickTarget = verifyClickTarget(target);
	if (!isValidClickTarget) {
		return;
	}

	display.textContent += `${target.value} `;
}

function verifyClickTarget(target) {
	if (target.classList.contains("no-display")) {
		return false;
	}

	if (!target.classList.contains("btn")) {
		return false;
	}

	return true;
}

export default updateDisplay;
