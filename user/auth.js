setInterval(refreshDesconect, 2000);
const authDataUser = JSON.parse(localStorage.getItem("dataUser"))
const bodyAuth = document.querySelector("body");
const tokenAuth = localStorage.getItem("token");
refreshDesconect();

function refreshDesconect() {
  if (tokenAuth && tokenAuth.length >= 20 ) {
    console.log("Sincronizando dados do usuario!");
  } else {
    localStorage.removeItem("token");
    sendMessage("LOGIN"," Usuario não autorizado deslogado do servidor.");
    console.warn("Usuario deslogado ou tokenAuth não disponivel");
    bodyAuth.style.display = "none";
    window.location.href = "/user/forbidden.html";
  }
} //Fim do Refresh desconectar
sendMessage("LOGIN", "Usuario " + authDataUser.user + " Logado no servidor.");

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

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("dataUser");
  window.location.href = "/";
  sendMessage("LOGIN",authDataUser.user + " desconectado do servidor! até mais 👋");
  alert("Usuario Desconectado!");
}

function FullScreen(){
  document.documentElement.requestFullscreen();
}