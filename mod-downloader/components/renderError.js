/**
 * Renderiza uma mensagem de erro.
 *
 * @param {HTMLElement} container
 * @param {string} message Mensagem de erro.
 * @param {string} [title="Erro ao carregar"]
 */
export function renderError(container, message, title = "Erro ao carregar") {
  container.replaceChildren();

  const div = document.createElement("div");

  div.className = "col-12 text-center py-5";

  div.innerHTML = `
		<div class="alert alert-danger shadow-sm text-start mx-auto" style="max-width: 720px;">
			<h4 class="alert-heading mb-3">
				⚠️ ${title}
			</h4>

			<p class="mb-0">
				${message || "Ocorreu um erro inesperado."}
			</p>
		</div>
	`;

  container.appendChild(div);
}
