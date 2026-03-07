import config from "./config.js";

/**
 * Atualiza o status visual do servidor
 * @param {boolean} online
 * @param {number|null} code
 * @return {void}
 */
function updateStatus(online, code = null) {
  const statusElement = document.getElementById("server-status");

  if (!statusElement) return;

  if (online) {
    statusElement.className = "badge bg-success fs-6";
    statusElement.textContent = `Servidor Online (${code})`;
  } else {
    statusElement.className = "badge bg-danger fs-6";
    statusElement.textContent = "Servidor Offline";
  }
}

/**
 * Verifica o status do backend
 * @returns {Promise<void>}
 */
async function checkServerStatus() {
  try {
    const response = await fetch(`${config.serverUrl}/status`, {
      method: "GET",
      mode: "cors",
    });

    if (response.status === 200) {
      updateStatus(true, response.status);
    } else {
      updateStatus(false, response.status);
    }
  } catch (error) {
    console.debug("[STATUS SERVER]", error);
    updateStatus(false);
  }
}

/**
 * Inicializa o sistema de monitoramento
 * @returns {void}
 */
function initServerStatus() {
  checkServerStatus();

  // atualiza a cada 30s
  setInterval(checkServerStatus, 30000);
}

initServerStatus();
