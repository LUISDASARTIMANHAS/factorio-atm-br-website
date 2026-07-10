import { createElement } from "./element.js";

export function createBadge(text, className = "", attributes = {}) {
	return createElement("span", className, text, attributes);
}
