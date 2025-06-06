import config from './config.js';
window.addEventListener("load", () => {
    const url = `https://ipinfo.io/json?token=${config.ipToken}`;
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
            throw new Error("Erro ao obter analytics: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        // exportando dados
        localStorage.setItem("ipinfo",JSON.stringify(data));

      })
      .catch((error) => {
        console.debug(`%c [SISTEMA IP] ${error}`, "color: #ff0000");
      });
});
