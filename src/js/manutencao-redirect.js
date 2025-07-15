import config from "./config.js";
window.addEventListener("load", async () => {
  try {
    const url = `${config.serverUrl}/manutencao`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    };
    await fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((errorText) => {
            const errorMessage = `Statuscode: ${response.status} - ${errorText}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        redirectManutencao(data);
      })
      .catch((error) => {
        console.debug(`%c [SISTEMA MANUTENÇÃO] ${error}`, "color: #ff0000");
        redirectManutencao(true);
      });

    function redirectManutencao(offline) {
      const DebugMode = JSON.parse(localStorage.getItem("debugMode")) || false;
      const body = document.querySelector("body");
      const verificarOfflineENaoDebugMode = offline && !DebugMode

      if (verificarOfflineENaoDebugMode) {
        body.hidden = true;

        if (body) {
          body.style.display = "none";
        }

        setTimeout(() => {
          window.location.href = "../sys/manutencao.html";
        }, 3000);
      }
    }
    redirectManutencao(false);
  } catch (error) {
    alert(`ERRO FATAL: ${error}`);
  }
});