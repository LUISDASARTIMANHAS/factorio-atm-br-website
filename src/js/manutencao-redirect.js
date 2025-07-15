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
      const verificarOfflineENaoDebugMode = offline && !DebugMode;

      if (DebugMode == true) {
        // não permite que seja inserido mais de um elemento

        if (document.getElementById("debugMode") == null) {
          renderDebugElements();
        }
      }

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

  function renderDebugElements() {
    const body = document.querySelector("body");
    const h1Alert = document.createElement("h1");
    const button = document.createElement("button");

    h1Alert.setAttribute("id", "debugMode");
    h1Alert.setAttribute("class", "rgb");
    h1Alert.setAttribute("rgb", "rgb");
    h1Alert.textContent = "Debug Mode Online!";

    button.setAttribute("class", "button button-red button-primary");
    button.textContent = "Desativar";
    button.addEventListener("click", () => {
      localStorage.setItem("debugMode", false);
      alert("Debug Mode Desativado!!");
      window.location.reload();
    })

    h1Alert.appendChild(button);
    body.insertAdjacentElement("beforebegin", h1Alert);
  }
});
