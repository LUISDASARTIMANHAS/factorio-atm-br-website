"use strict";

/**
 * Inicializa a faixa com a localização aproximada desta conexão.
 *
 * @returns {Promise<void>}
 */
async function initClientLocation() {
  const locationElement = document.getElementById("clientLocation");

  if (!locationElement) return;

  try {
    const { ip, country, city } = await fetchClientLocation();
    locationElement.textContent =
      "IP: " + ip + " | País: " + country + " | Cidade: " + city;
  } catch (error) {
    locationElement.textContent = "Localização indisponível";
    console.warn("Não foi possível carregar os dados da conexão.", error);
  }
}