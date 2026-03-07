(() => {
  window.factorio_message = function message(title, msg) {
    const url = `${window.env.apiUrl}/mensagem`;
    const ipinfo = localStorage.getItem("ipinfo");
    const payload = {
      titulo: title.toUpperCase(),
      mensagem: msg,
      ipinfo: ipinfo,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: getAuthorizationHeaderManutencao(),
        "X-Disable-Cache": "true", // Desativando o cache via cabeçalho
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          const headers = response.headers;
          const contentType = headers.get("Content-Type");
          console.log(contentType);

          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text();
          }
        } else {
          return response.text().then((errorText) => {
            const errorMessage = `Statuscode: ${response.status} - ${errorText}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
      })
      .catch((error) => console.debug(error));
  };

  function getAuthorizationHeaderManutencao() {
    const combined = `${window.env.encodedUserManutencao}:${window.env.encodedPasswordManutencao}`;
    const doubleEncoded = btoa(btoa(combined));
    return `Basic ${doubleEncoded}`;
  }
})();
