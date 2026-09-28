import { fetchVisitorHeaders } from "../api-client.js";
import { createElement } from "./base/dom-utils.js";

const LOCATION_FIELDS = [
  { label: "IP", keys: ["cf-connecting-ip", "true-client-ip", "x-forwarded-for", "ip"] },
  { label: "País", keys: ["cf-ipcountry", "country"] },
  { label: "Cidade", keys: ["cf-ipcity", "city"] },
];

/**
 * Exibe os dados de localização da conexão atual no contêiner informado.
 * @param {HTMLElement|null} container
 * @returns {Promise<void>}
 */
export async function initVisitorLocation(container) {
  if (!container) return;

  try {
    const response = await fetchVisitorHeaders();
    const headers = response.headers && typeof response.headers === "object"
      ? response.headers
      : response;
    const values = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
    );

    const fields = LOCATION_FIELDS.map(({ label, keys }) => {
      const rawValue = keys.map((key) => values[key]).find(Boolean);
      let value = rawValue === undefined ? "Indisponível" : String(rawValue);

      if (label === "IP" && value.includes(",")) {
        value = value.split(",")[0].trim();
      }
      if (label === "Cidade" && value !== "Indisponível") {
        try {
          value = decodeURIComponent(value.replace(/\+/g, " "));
        } catch {
          // Mantém o valor original quando a cidade não estiver codificada corretamente.
        }
      }
      if (label === "País" && /^[a-z]{2}$/i.test(value)) {
        try {
          value = new Intl.DisplayNames(["pt-BR"], { type: "region" }).of(value) || value;
        } catch {
          // Mantém o código do país se o navegador não suportar Intl.DisplayNames.
        }
      }

      return { label, value };
    });

    renderLocation(container, fields);
  } catch {
    renderLocation(
      container,
      LOCATION_FIELDS.map(({ label }) => ({ label, value: "Indisponível" })),
    );
  }
}

/**
 * Renderiza a faixa usando apenas texto, sem interpretar valores remotos como HTML.
 * @param {HTMLElement} container
 * @param {Array<{label: string, value: string}>} fields
 * @returns {void}
 */
function renderLocation(container, fields) {
  const content = createElement("div", "visitor-location-content", null, {}, [], "");

  fields.forEach(({ label, value }) => {
    const item = createElement("span", "visitor-location-item", null, {}, [], "");
    item.append(
      createElement("strong", "visitor-location-label", `${label}:`, {}, [], ""),
      document.createTextNode(` ${value}`),
    );
    content.appendChild(item);
  });

  container.replaceChildren(content);
}