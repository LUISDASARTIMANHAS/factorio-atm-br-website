
async function redirectDownloadMediafire(type) {
  const url = `${window.env.apiUrl}/download/mediafire/${type}`;
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      "X-Disable-Cache": "true", // Desativando o cache via cabeçalho
    },
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          throw new Error("Erro ao obter analytics: " + errorText);
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      window.open(data);
    })
    .catch((error) => {
      downloadMessage(`[FACTORIO SISTEMA] ${error}`);
      console.debug(`%c [FACTORIO SISTEMA] ${error}`, "color: #ff0000");
      alert(error);
    });
}

async function redirectDownloadSave(server) {
  const urlSource = "https://drive.google.com/drive/folders";
  let id = null;

  if (server == 1) {
    id = "1-2amST51Oy7IPot76espwTCr8VCrqrtZ";
    server = "DRIVE LUIS DAS ARTIMANHAS I3 2TH 1.5";
  } else if (server == 2) {
    id = "1-0H8T-47bcfb99z1nst2ZPWK5nLdAKYx";
    server = "DRIVE DO PENTIUM";
  }

  await downloadMessage(
    "Requisição para Download de Save! SERVIDOR: " + server
  );
  window.open(`${urlSource}/${id}?usp=sharing`);
}

async function downloadMessage(msg) {
  await window.factorio_message("DOWNLOAD", msg);
}
