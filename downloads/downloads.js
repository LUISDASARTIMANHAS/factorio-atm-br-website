import config from "../src/js/config.js";

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
