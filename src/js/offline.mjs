import config from "./config.js";
import { alternarVisibilidade, getStatus } from "./utils.mjs";
(async () => {
  try {
    try {
      let res = await getStatus();
      // se o servidor nao mandou resposta entao ele ta offline
      if (!res) {
        redirectOffline(true);
      }
    } catch (error) {
      redirectOffline(true);
    }

    function redirectOffline(isOffline) {
      if (isOffline) {
        // deixar visivel? true = sim, false = nao
        // inverti o sinal pra quando isOffline (true) mostrar a pagina atual (false) e depois de um tempo redirecionar
        alternarVisibilidade(false);

        setTimeout(() => {
          window.location.href = "./sys/offline.html";
        }, 1000 * config.defaultTimeoutSeconds);
      }
    }
  } catch (error) {
    alert(`ERRO FATAL: ${error}`);
  }
})();
