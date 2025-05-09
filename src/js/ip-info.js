window.addEventListener("load", () => {
  try {
    const url = `https://ipinfo.io/json?token=${window.env.ipInfo}`;
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
        localStorage.setItem("local_ipinfo", JSON.stringify(data));
      })
      .catch((error) => {
        ipInfoMessage(`[FACTORIO SISTEMA] FALHA NA REQUISIÇÃO: ${error}`);
        console.debug(`%c [FACTORIO SISTEMA] ${error}`, "color: #ff0000");
      });
  } catch (error) {
    ipInfoMessage(`[FACTORIO SISTEMA] ${error}`);
  }
  async function ipInfoMessage(msg) {
    await window.factorio_message("IPINFO", msg);
  }
});
