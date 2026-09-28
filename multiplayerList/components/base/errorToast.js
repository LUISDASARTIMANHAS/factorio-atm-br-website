import { createElement } from "./dom-utils.js";

/**
 * Exibe um erro em um toast global que desaparece automaticamente.
 *
 * @param {Error} error
 * @returns {void}
 */
export function showErrorToast(error) {
  let toastElement = document.getElementById("errorToast");

  if (!toastElement) {
    toastElement = createElement("div", "error-toast", null, {
      id: "errorToast",
      role: "alert",
      "aria-live": "assertive",
      "aria-atomic": "true",
    });
    toastElement.innerHTML = `
      <div class="error-toast-header">
        <strong>Erro na comunicação</strong>
        <button type="button" class="error-toast-close" aria-label="Fechar aviso">&times;</button>
      </div>
      <div class="error-toast-message"></div>`;

    toastElement.querySelector(".error-toast-close").addEventListener(
      "click",
      () => hideErrorToast(toastElement),
    );
    document.body.append(toastElement);
  }

  toastElement.querySelector(".error-toast-message").textContent =
    error.message || "Ocorreu um erro inesperado.";

  clearTimeout(toastElement.hideTimer);
  toastElement.classList.add("is-visible");
  toastElement.hideTimer = setTimeout(
    () => hideErrorToast(toastElement),
    6000,
  );
}

function hideErrorToast(toastElement) {
  toastElement.classList.remove("is-visible");
}