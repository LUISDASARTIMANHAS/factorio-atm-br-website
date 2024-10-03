const form = document.querySelector("form");
const msgError = document.getElementById("msgError");
const msgSuccess = document.getElementById("msgSuccess");
const date = new Date();
const day = date.getDate();
const url = "https://pingobras-sg.glitch.me/api/factorio-server/login";

form.addEventListener("click", stopDefAction, false);

function stopDefAction(evt) {
  evt.preventDefault();
}

function getData() {
  const inpSenha = document.getElementById("senha");
  const inpUsuario = document.getElementById("usuario");
  const payloadLogin = {
    usuario: inpUsuario.value,
    senha: inpSenha.value,
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: "APIKey20231603",
    },
    body: JSON.stringify(payloadLogin),
  };

  msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = "Aguardando Servidor....";
    msgSuccess.setAttribute("style", "display: block");
  sendMessage("LOGIN",inpUsuario.value + " está tentando fazer login!")
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na solicitação, URL inválida ou fetch inválido");
        return response.text()
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      autenticar(data);
    })
    .catch((error) => errosLogin(error));
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


function autenticar(userLogado) {
  const clientID = Math.random().toString(9).substr(16);
  const mathRandom = Math.random().toString(16).substr(2);
  let token = mathRandom + mathRandom + "ValidDB:" + clientID;

  localStorage.setItem("token", token);
  
    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = "Validando acesso...";
    msgSuccess.setAttribute("style", "display: block");
    const dataUser = {
      user: userLogado.userCad,
      senha: userLogado.senhaCad,
      PerfilIMG: userLogado.PerfilIMG,
      admin: userLogado.admin
    };
    const dataUserJson = JSON.stringify(dataUser);
    localStorage.setItem("dataUser", dataUserJson);

    setTimeout(() => {
        window.location.href = "/user"
    },7000);
}

function errosLogin(error) {
  console.debug(error);
  msgError.setAttribute("style", "display: block");
  msgError.innerHTML = "Usuário ou Senha Incorretos";
  msgSuccess.setAttribute("style", "display: none");
}