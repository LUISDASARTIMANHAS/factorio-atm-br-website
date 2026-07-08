/**
 * Renderiza loading.
 *
 * @param {HTMLElement} container
 */
export function renderLoading(container) {
	container.replaceChildren();

	const div = document.createElement("div");

	div.className = "col-12 text-center py-5";

	div.innerHTML = `
		<div class="spinner-border text-primary"></div>
		<p class="mt-2">
			Sincronizando banco de dados...
		</p>
	`;

	container.appendChild(div);
}
