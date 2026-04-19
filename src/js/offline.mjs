import config from "./config.js";
import { alternarVisibilidade, getStatus } from "./utils.mjs";
(() => {
  alternarVisibilidade(false);
  try {
    try {
      let res = getStatus();
      if (res) {
        redirectOffline(false);
      }
    } catch (error) {
      redirectOffline(true);
    }

    function redirectOffline(offline) {
      if (!offline) {
        alternarVisibilidade(!offline);

        setTimeout(() => {
          // window.location.href = "./sys/offline.html";
        }, 1000 * config.defaultTimeoutSeconds);
      }
    }
    redirectOffline(false);
  } catch (error) {
    alert(`ERRO FATAL: ${error}`);
  }
})();

