import { createElement } from "./dom-utils.js";

export function createBadge(text, className = "", attributes = {}) {
	return createElement("span", className, text, attributes);
}
