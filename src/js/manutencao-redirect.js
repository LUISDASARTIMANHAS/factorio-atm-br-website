// window.addEventListener("load", () => {
// faz com que o script espere a pagina carregar incluindo importacoes indiretas
window.addEventListener("load", () => { 
  const body = document.querySelector("body");
  const url = `${window.env.apiUrl}/manutencao`;
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      authorization: window.env,
    },
  };
  body.style.cursor = "wait";
  
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
      console.log("DATA RESPONSE: ");
      console.log(data);
      redirectManutencao(data);
    })
    .catch((error) => {
      console.error(error);
    });

  function redirectManutencao(offline) {
    const devUser = JSON.parse(localStorage.getItem("dev")) || false;
    const expUser =
      JSON.parse(localStorage.getItem("experimentalMode")) || false;
    const body = document.querySelector("body");

    if (offline && !devUser) {
      body.hidden = true;

      if (body) {
        body.style.display = "none";
      }

      setTimeout(() => {
        window.location.href = "/sys/manutencao.html";
      }, 3000);
    }
  }
  redirectManutencao(false);

  
  body.style.cursor = "default";
});