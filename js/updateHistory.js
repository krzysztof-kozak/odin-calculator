import { history } from "./index.js";
import { isNegative } from "./updateDisplay.js";

function updateHistory(memory, result) {
	const historyItem = document.createElement("div");
	const topParagraph = document.createElement("p");
	const bottomParagraph = document.createElement("p");

	historyItem.classList.add("history__item");
	topParagraph.classList.add("item-top");

	topParagraph.textContent = memory.map((el) => (el = isNegative(el) ? `(${el})` : el)).join(" ");
	bottomParagraph.textContent = result;

	historyItem.appendChild(topParagraph);
	historyItem.appendChild(bottomParagraph);

	history.insertAdjacentElement("afterbegin", historyItem);
}

export default updateHistory;
