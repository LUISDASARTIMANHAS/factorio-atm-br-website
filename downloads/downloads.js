async function redirectDownloadMediafire(url) {
  const urlSource = "https://www.mediafire.com/folder";
  let id = null;

  if (url == "/GAME") {
    id = "tnvw10lp5dj9u";
  } else if (url == "/DLC") {
    id = "wst8sryoqyivx";
  }else if (url == "/ONI") {
    id = "khh8z4sve6e2y";
  }
  await downloadMessage("Requisição para Download do Factorio! Type: " + url );
  window.open(`${urlSource}/${id}${url}`);
}

async function redirectDownloadSave(server) {
  const urlSource = "https://drive.google.com/drive/folders";
  let id = null;
  
  if (server == 1) {
    id = "1-2amST51Oy7IPot76espwTCr8VCrqrtZ";
    server = "DRIVE LUIS DAS ARTIMANHAS I3 2TH 1.5"
  } else if (server == 2) {
    id = "1-0H8T-47bcfb99z1nst2ZPWK5nLdAKYx";
    server = "DRIVE DO PENTIUM"
  }
  
  await downloadMessage("Requisição para Download de Save! SERVIDOR: " + server);
  window.open(`${urlSource}/${id}?usp=sharing`);
}

async function redirectDownloadMod(server) {
  const urlSource = "https://drive.google.com/drive/folders";
  let id = null;
  
  if (server == 1) {
    id = "118Dd0InlPrPYrOePhdIpfnjCZSf0gwUu";
    server = "DRIVE LUIS DAS ARTIMANHAS I3 2TH 1.5"
  } else if (server == 2) {
    id = "120sw6FIfh_rTHn_OISsAnNZJK3QEGUX_";
    server = "DRIVE DO PENTIUM"
  }
  
  await downloadMessage("Requisição para Download de Save! SERVIDOR: " + server);
  window.open(`${urlSource}/${id}?usp=sharing`);
}


  async function downloadMessage(msg) {
    await window.factorio_message(
      "DOWNLOAD",
      msg
    );
  }