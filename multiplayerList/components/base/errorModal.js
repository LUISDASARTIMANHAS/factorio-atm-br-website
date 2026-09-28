import { createElement } from "./dom-utils.js";

/**
 * Exibe um erro em um modal Bootstrap reutilizável.
 *
 * @param {Error} error
 * @returns {void}
 */
export function showErrorModal(error) {
  let modalElement = document.getElementById("errorModal");

  if (!modalElement) {
    modalElement = createElement("div", "modal fade", null, {
      id: "errorModal",
      tabIndex: "-1",
      "aria-labelledby": "errorModalLabel",
      "aria-hidden": "true",
    });
    modalElement.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title h5" id="errorModalLabel">Erro na comunicação</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body" id="errorModalMessage"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>`;
    document.body.append(modalElement);
  }

  const message = modalElement.querySelector("#errorModalMessage");
  message.textContent = error.message || "Ocorreu um erro inesperado.";

  if (window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalElement).show();
  } else {
    modalElement.classList.add("show");
    modalElement.style.display = "block";
  }
}