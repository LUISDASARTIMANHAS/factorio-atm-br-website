import config from "https://luisdasartimanhas.github.io/factorio-atm-br-website/src/js/config.js";
export async function redirectDownloadMediafire(type) {
  const url = `${config.apiUrl}/download/mediafire/${type}`;
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      "X-Disable-Cache": "true", // Desativando o cache via cabeçalho
      "id": id,
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

export async function redirectDownloadSave(serverID) {
  const urlSource = "https://drive.google.com/drive/folders";
  let id = null;

  if (serverID == 1) {
    id = "1-2amST51Oy7IPot76espwTCr8VCrqrtZ";
    serverID = "DRIVE LUIS DAS ARTIMANHAS I3 2TH 1.5";
  } else if (serverID == 2) {
    id = "1-0H8T-47bcfb99z1nst2ZPWK5nLdAKYx";
    serverID = "DRIVE DO PENTIUM";
  }

  await downloadMessage(
    "Requisição para Download de Save! SERVIDOR: " + serverID
  );
  window.open(`${urlSource}/${id}?usp=sharing`);
}

async function downloadMessage(msg) {
  await window.factorio_message("DOWNLOAD", msg);
}

// Tornar funções acessíveis internamente
const actions = {
  redirectDownloadMediafire,
  redirectDownloadSave,
};

// Delegação de eventos para todos os botões com data-action
document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.getAttribute("data-action");
  const arg = button.getAttribute("data-arg");

  if (actions[action]) {
    actions[action](arg);
  } else {
    console.warn(`Ação desconhecida: ${action}`);
  }
});
