import config from "../src/js/config.js";

export function downloadFactorioGame(game, type) {
  const baseUrl = `${config.serverUrl}/download/factorio`;
  let build = null;
  let distro = null;

  console.log("Tipo recebido:", type);
  console.log("Jogo recebido:", game);

  switch (type) {
    case "ORIGINAL":
      build = "alpha";
      break;
    case "SPACE AGE":
      build = "space-age";
      break;
    case "DEMO":
      build = "demo";
      break;
    case "SERVER":
      build = "server";
      break;
    default:
      console.warn(`Jogo ${type} INDISPONÍVEL!`);
      break;
  }

  if (game == "exe") {
    distro = "exe";
  } else if (game == "zip") {
    distro = "zip";
  } else {
    console.warn(`Tipo ${game} do arquivo INDISPONÍVEL!`);
  }

  console.log("BaseUrl:", baseUrl);
  console.log("Build:", build);
  console.log("Distro:", distro);
  alert(game+type);
  // window.open(`${baseUrl}/${distro}/${build}`);
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


