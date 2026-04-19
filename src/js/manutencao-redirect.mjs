// import config from "./config.js";
import { alternarVisibilidade, getStatusManutencao } from "./utils.mjs";
window.addEventListener("load", async () => {
  try {
    try {
      let res = getStatusManutencao();
      if (res) {
        redirectManutencao(false);
      }
    } catch (error) {
      redirectManutencao(true);
    }

    function redirectManutencao(offline) {
      const DebugMode = JSON.parse(localStorage.getItem("debugMode")) || false;
      const verificarOfflineENaoDebugMode = offline && !DebugMode;

      if (DebugMode == true) {
        // não permite que seja inserido mais de um elemento

        if (document.getElementById("debugMode") == null) {
          renderDebugElements();
        }
      }

      alternarVisibilidade(!offline);

      setTimeout(() => {
        window.location.href = "../sys/manutencao.html";
      }, 3000);
    }
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
    });

    h1Alert.appendChild(button);
    body.insertAdjacentElement("beforebegin", h1Alert);
  }
});
