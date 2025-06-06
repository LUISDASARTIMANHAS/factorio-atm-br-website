import config from "./config.js";
window.addEventListener("load", () => {
  try {
    const url = `${config.apiUrl}/manutencao`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    };
    fetch(url, options)
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
      });

    function redirectManutencao(offline) {
      const devUser = JSON.parse(localStorage.getItem("dev")) || false;
      const expUser =
        JSON.parse(localStorage.getItem("experimentalMode")) || false;
      const body = document.querySelector("body");

      if ((offline && !devUser) || (offline && !devUser)) {
        body.hidden = true;

        if (body) {
          body.style.display = "none";
        }

        setTimeout(() => {
          window.location.href = "./sys/manutencao.html";
        }, 3000);
      }
    }
    redirectManutencao(true);
  } catch (error) {
    alert(`ERRO FATAL: ${error}`);
  }
});
