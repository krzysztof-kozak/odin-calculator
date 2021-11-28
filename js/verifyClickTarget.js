function verifyClickTarget(target) {
	if (!target.classList.contains("btn")) {
		return false;
	}

	return true;
}

export default verifyClickTarget;
