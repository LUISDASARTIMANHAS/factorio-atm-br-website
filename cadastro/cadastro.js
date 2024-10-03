const form = document.getElementById("form");
const msgError = document.getElementById("msgError");
const msgSuccess = document.getElementById("msgSuccess");
const url = "https://pingobras-sg.glitch.me/api/factorio-server/cadastro";

function verificar() {
  const inpUsuario = document.getElementById("usuario").value;
  const inpEmail = document.getElementById("email").value;
  const inpSenha = document.getElementById("senha").value;
  const inpConfirmSenha = document.getElementById("confirm-Senha").value;

  const msgUsuario = document.getElementById("msgUsuario");
  const msgEmail = document.getElementById("msgEmail");
  const msgSenha = document.getElementById("msgSenha");
  const msgConfirmSenha = document.getElementById("msgConfirmSenha");
  var valid = false;
 
  if (inpUsuario && inpUsuario.length >= 5) {
    valid = true;
    msgUsuario.style.display = "none";
  } else {
    msgUsuario.innerHTML = "O Usuario deve ser maior do que 5 caracteres";
    msgUsuario.style.display = "block";
    valid = false;
  }
  if (inpEmail && inpEmail.length >= 8) {
    valid = true;
    msgEmail.style.display = "none";
  } else {
    msgEmail.innerHTML =
      "O Email deve ser maior do que 8 caracteres, inclua o final '@gmail.com' ou outro.";
    msgEmail.style.display = "block";
    valid = false;
  }
  if (inpSenha && inpSenha.length > 8) {
    valid = true;
    msgSenha.style.display = "none";
  } else {
    msgSenha.innerHTML =
      "A Senha deve ser maior do que 8 caracteres";
    msgSenha.style.display = "block";
    valid = false;
  }
  if (inpConfirmSenha && inpConfirmSenha == inpSenha) {
    valid = true;
    msgConfirmSenha.style.display = "none";
  } else {
    msgConfirmSenha.innerHTML =
      "As Senhas não conhecidem, Confirme sua Senha!";
    msgConfirmSenha.style.display = "block";
    valid = false;
  }
  
  if (valid) {
    msgSuccess.innerHTML = "Usuario Valido!";
    msgSuccess.style.display = "block";
    msgError.style.display = "none";
    
    return valid;
  } else {
    msgSuccess.style.display = "none";

    return valid;
  }
}

function cadastrar() {
  const inpUsuario = document.getElementById("usuario");
  const inpEmail = document.getElementById("email");
  const inpSenha = document.getElementById("senha");
  const validation = verificar();
  const dataUser = {
    userCad: inpUsuario.value,
    emailCad: inpEmail.value,
    senhaCad: inpSenha.value,
    PerfilIMG: "",
  };
  if (validation) {
    msgSuccess.innerHTML = "Cadastrando Usuario....";
    msgSuccess.style.display = "block";
    postData(dataUser);
  } else {
    msgError.innerHTML = "Erro ao cadastrar dados incompletos";
    msgError.style.display = "block";
    msgSuccess.style.display = "none"
    console.log("Validação do Usuario: "+ validation)
  }
}

function postData(payload) {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      "Authorization": "APIKey20231603",
    },
    body: JSON.stringify(payload),
  };
sendMessage("CADASTRO", "Cadastrando usuario " + payload.userCad + "...");
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        sendMessage("CADASTRO", "Erro ao cadastrar " + payload.userCad);
        throw new Error("Erro na solicitação, URL inválida ou fetch inválido. type: " + Error);
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      window.location.href = "/login"
    })
    .catch((error) => erros(error));
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
function erros(error) {
  console.debug(error);
  alert(error);
}
form.addEventListener("click", stopDefAction, false);
function stopDefAction(evt) {
  evt.preventDefault();
}