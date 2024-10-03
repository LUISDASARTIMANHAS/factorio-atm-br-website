setInterval(Reload, 5000);
setTimeout(sendStatus, 7000);
localStorage.setItem("userToken", "PINGOBRAS.SA");

function Reload() {
  const IPServer = document.getElementById("Porta-Server").textContent;
  const versao = document.getElementById("versions").value;
  const slots = document.getElementById("saves").value;
  const mods = document.getElementById("mods-enabled").value;
  const mundo = slots
    .replaceAll("slot1", "HUB")
    .replaceAll("slot2", "BOB, O PATO")
    .replaceAll("slot3", "GLADIADOR")
    .replaceAll("slot4", "LDA");
  const FactorioDBStats = {
    IP: IPServer,
    Versao: versao,
    Mundo: mundo,
    Mods: mods,
  };
  const FactorioDB = JSON.stringify(FactorioDBStats);
  localStorage.setItem("FactorioDB", FactorioDB);
  console.log("Atualizando banco de dados...");
}
Reload();

function sendStatus() {
  const db = JSON.parse(localStorage.getItem("FactorioDB"));
  const url = "https://pingobras-sg.glitch.me/api/factorio-server/mensagem";
  const IPServer = db.IP;
  const versao = db.Versao;
  const mundo = db.Mundo;
  const mods = db.Mods;
  var bar = genBar(10);
  bar = fillBar(bar,mods/10)
  const payload = {
    titulo: "STATUS",
    mensagem: `
    \n __**ESTATISTICAS DO JOGADOR:**__
    VERSÃO: ${versao}
    MUNDO: ${mundo}
    MODS: ${mods} / 
    %${bar}
    IP: ${IPServer}`,
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: "APIKey20231603",
    },
    body: JSON.stringify(payload),
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
    })
    .catch((error) => console.debug(error));

  function genBar(tam) {
    const barEmpty = "⬜";
    var bar = "";

    for (let i = 0; i < tam; i++) {
      bar = bar + barEmpty;
    }
    return bar;
  }

  function fillBar(bar, tam) {
    const barFill = "🟩";

    for (let i = 0; i < tam; i++) {
      bar = bar.replace("⬜", barFill);
    }
    return bar;
  }
}
