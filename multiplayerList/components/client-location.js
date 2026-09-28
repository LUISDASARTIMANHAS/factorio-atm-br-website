import { createElement } from "./base/dom-utils.js";
import { createSpan } from "./base/span.js";
import { fetchClientLocation } from "../js/api-client.js";

/**
 * Cria a faixa de localização no rodapé da página.
 *
 * @returns {HTMLElement}
 */
function createClientLocation() {
  const status = createSpan(
    "Localização: carregando...",
    "",
    { id: "clientLocation", role: "status", "aria-live": "polite" },
  );
  const content = createElement("div", "container-fluid", null, {}, [status]);

  return createElement(
    "footer",
    "client-location-bar",
    null,
    { "aria-label": "Localização aproximada desta conexão" },
    [content],
  );
}

/**
 * Monta a faixa e carrega os dados fornecidos pelo endpoint autorizado.
 *
 * @returns {Promise<void>}
 */
async function initClientLocation() {
  const footer = createClientLocation();
  document.body.appendChild(footer);

  try {
    const { ip, country, city } = await fetchClientLocation();
    footer.querySelector("#clientLocation").textContent =
      "IP: " + ip + " | País: " + country + " | Cidade: " + city;
  } catch (error) {
    footer.querySelector("#clientLocation").textContent =
      "IP, país e cidade indisponíveis";
    console.warn("Não foi possível carregar os dados da conexão.", error);
  }
}

document.addEventListener("DOMContentLoaded", initClientLocation, { once: true });