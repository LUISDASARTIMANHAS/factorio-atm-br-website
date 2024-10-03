const fileInput = document.getElementById("modsFile");
const savesFile = document.getElementById("savesFile");
var dataUser = JSON.parse(localStorage.getItem("dataUser"));
var user = dataUser.user;
var admin = dataUser.admin;

function sendMod(file) {
  const visit = localStorage.getItem("secret");
  const url = "https://factorio.zone/api/mod/upload";

  const formData = new FormData();
  formData.append("visitSecret", visit);
  formData.append("file", file);
  formData.append("size", file.size.toString());

  const options = {
    method: "POST",
    mode: "no-cors",
    body: formData,
  };
  sendMessage("UPLOAD", user + " Enviou um mod!");
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
    .catch((error) => {
      console.debug(error);
    });
}

savesFile.addEventListener("change", sendSave);
function sendSave() {
  const file = savesFile.files[0];
  const tam = savesFile.files.length;
  const save = localStorage.getItem("lastSave");
  const visit = localStorage.getItem("secret");
  const url = "https://factorio.zone/api/save/upload";

  const formData = new FormData();
  formData.append("visitSecret", visit);
  formData.append("file", file);
  formData.append("size", file.size.toString());
  formData.append("save", save);

  const options = {
    method: "POST",
    mode: "no-cors",
    body: formData,
  };
  alert(`SERVIDOR: Enviando ${file.name}!`);
  sendMessage("UPLOAD", user + " Enviou um Save!");
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then((data) => {
     alert(`SERVIDOR: ${file.name} enviado!`);
      console.log("DATA RESPONSE: ");
      console.log(data);
    })
    .catch((error) => {
      console.debug(error);
    });
}

fileInput.addEventListener("change", enviarVariosMods);
function enviarVariosMods() {
  const selectedFiles = fileInput.files;
  const tam = fileInput.files.length;
  var bar = genBar(tam);
  var i = 0;

  for (const file of selectedFiles) {
    const name = file.name;
    const totalString = sendMod(file);
    
    bar = fillBar(bar,1);
    sendMessage(
      "UPLOAD/STATUS",
      `
    Enviando Arquivos: ${name}, 
    %${bar}
    TOTAL: ${i}/${tam}`
    );
    i++;
  }
  sendMessage(
    "UPLOAD/STATUS",
    `A fila de Mods enviados terminou!
     %${bar}
     TOTAL: ${tam}`
  );
}

fileInput.click();

function fetchDelModFactorio(mod) {
  const visit = localStorage.getItem("secret");
  const modID = mod.id;
  const modName = mod.text;
  console.log(mod)
  const payload = "visitSecret=" + visit + "&modId=" + modID;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    mode: "no-cors",
    body: payload,
  };

  sendMessage("DELETE", user + " Deletou o mod: " + modName);
  fetch("https://factorio.zone/api/mod/delete", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na solicitação, URL inválida ou fetch inválido");
        return response.text();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => onError(error));

  function onError(error) {
    console.error(error);
  }

  function onSuccess(resposta) {
    console.log("DATA RESPONSE: ");
    console.log(resposta);
  }
}

function fetchDelSaveFactorio(mod) {
  const visit = localStorage.getItem("secret");
  const modID = mod.id;
  const modName = mod.text;
  console.log(mod)
  const payload = "visitSecret=" + visit + "&modId=" + modID;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    mode: "no-cors",
    body: payload,
  };

  sendMessage("DELETE", user + " Deletou o mod: " + modName);
  fetch("https://factorio.zone/api/save/delete", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na solicitação, URL inválida ou fetch inválido");
        return response.text();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => onError(error));

  function onError(error) {
    console.error(error);
  }

  function onSuccess(resposta) {
    console.log("DATA RESPONSE: ");
    console.log(resposta);
  }
}

function fetchDelModFactorioAll() {
  const modsDB = JSON.parse(localStorage.getItem("modsDB"));
  const tam = modsDB.length - 1;
  var bar = genBar(tam);
  
  if (modsDB) {
    for (let i = 0; i < modsDB.length; i++) {
      const mod = modsDB[i];
      const modID = mod.id;
      const modName = mod.text;
      
      bar = fillBar(bar,1);
      fetchDelModFactorio(mod);
      sendMessage(
        "DELETE/STATUS",
        `Deletando Arquivos:  ${modName},
         %${bar}
         TOTAL: ${i}/${tam}`
      );
    }
    sendMessage(
        "DELETE/STATUS",
        `A fila de mods deletados terminou!,
         %${bar}
         TOTAL: ${tam}`
      );
  } else {
    alert("Nenhum mod para ser deletado!");
  }
}

function sendMessage(titulo, msg) {
  const url = "https://pingobras-sg.glitch.me/api/factorio-server/mensagem";
  const payload = {
    titulo: titulo,
    mensagem: msg,
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
}

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
    bar = bar.replace("⬜",barFill);
  }
  return bar;
}