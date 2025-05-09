// window.addEventListener("load", () => {
// faz com que o script espere a pagina carregar incluindo importacoes indiretas
window.addEventListener("load", () => {
  try {
    const body = document.querySelector("body");
    const url = `${window.env.apiUrl}/manutencao`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
        "X-Disable-Cache": "true", // Desativando o cache via cabeçalho
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
      .catch(async (error) => {
        await onError(error);
        redirectManutencao(true);
      });

    function redirectManutencao(offline) {
      const devUser = JSON.parse(localStorage.getItem("dev")) || false;

      // verifica se offline e verdadeiro  e se dev user e verdadeiro para bloquear o site
      if (offline && !devUser) {
        body.hidden = true;
        body.style.display = "none";
        body.style.cursor = "not-allowed";

        setTimeout(() => {
          window.location.href = "/sys/manutencao.html";
        }, 3000);
      }
    }
    redirectManutencao(false);

    body.style.cursor = "default";
  } catch (error) {
    onError(error);
  }

  async function onError(err) {
    console.error(err);
    await manuMessage(`ERROR FATAL: ${err}`);
    alert(err);
  }

  async function manuMessage(msg) {
    await window.factorio_message("SISTEMA DE MANUTENÇÃO", msg);
  }
});
