import { enviarDados, getCookie } from "../src/js/utils.mjs";

window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const formCode = document.getElementById("formCode");
  const cookieContinuarConectado = getCookie("continuarConectado");
  const lastDataUser = localStorage.getItem("dataUser");

  form.addEventListener("submit", stopDefAction);
  formCode.addEventListener("submit", stopDefActionSendCode);

  if (cookieContinuarConectado == "true" && lastDataUser) {
    window.location.href = "/user";
  }

  function stopDefAction(event) {
    event.preventDefault();
    getData();
  }

  function stopDefActionSendCode(event) {
    event.preventDefault();
    sendCode();
  }

  function getData() {
    const inpEmail = document.getElementById("email");
    const payloadLogin = {
      email: inpEmail.value,
      type: "user",
    };
    // const options = {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "content-type": "application/json;charset=utf-8",
    //     Authorization: window.getAuthorizationHeader(),
    //     key: date.getUTCHours() * date.getFullYear() * id,
    //     id: id,
    //   },
    //   body: JSON.stringify(payloadLogin),
    // };

    loginMessage(`${censurarEmail(inpEmail.value)} Pediu um magic Link!`);
    await enviarDados("api/login/magiclink",payloadLogin)

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          loginMessage(`Magic Link enviado com sucesso!`);
          return response.text();
        } else {
          return response.text().then((errorText) => {
            loginMessage("Erro ao Enviar Codigo Magick Link: " + errorText);
            throw new Error("Erro ao Enviar Codigo Magick Link: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        alert(data);
        form.hidden = true;
        formCode.hidden = false;
      })
      .catch((error) => onError(error));
  }

  async function sendCode() {
    const inpEmail = document.getElementById("email");
    const inpCode = document.getElementById("code");
    const payloadLogin = {
      email: inpEmail.value,
      code: inpCode.value,
    };
    // const options = {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "content-type": "application/json;charset=utf-8",
    //     Authorization: window.getAuthorizationHeader(),
    //     key: date.getUTCHours() * date.getFullYear() * id,
    //     id: id,
    //   },
    //   body: JSON.stringify(payloadLogin),
    // };

    await loginMessage(
      censurarEmail(inpEmail.value) + " está tentando fazer login!"
    );
    await enviarDados("api/login",payloadLogin)
    fetch(url, options)
      .then(async (response) => {
        if (response.ok) {
          await loginMessage(
            censurarEmail(inpEmail.value) + " Fez Login com sucesso!"
          );
          return response.json();
        } else {
          return response.text().then(async (errorText) => {
            await loginMessage("Erro ao fazer login: " + errorText);
            throw new Error("Erro ao fazer login: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        autenticar(data);
      })
      .catch((error) => onError(error));
  }

  function autenticar(userLogado) {
    const manterConectado = document.getElementById("continueConnected");
    const dataUserJson = JSON.stringify(userLogado);
    const cords = 127;
    const seed =
      getRandomInt(cords) *
      getRandomInt(cords) *
      getRandomInt(cords) *
      getRandomInt(cords);
    const hexKey =
      getRandomHex(seed) +
      getRandomHex(seed) +
      getRandomHex(seed) +
      getRandomHex(seed);
    const clientID = getRandomInt(255);
    let token = hexKey + hexKey + "ValidDB:" + clientID;

    localStorage.setItem("token", token);
    formMessage("Validando acesso...");
    localStorage.setItem("dataUser", dataUserJson);
    setCookie("continuarConectado", manterConectado.checked, 5);

    setTimeout(() => {
      window.location.href = "/user";
    }, 7000);
  }

  async function loginMessage(msg) {
    await window.factorio_message("LOGIN", msg);
  }



  function censurarEmail(email) {
    if (email.length >= 5) {
      // Mantém os primeiros cinco caracteres e substitui o restante por asteriscos
      const censurado = email.slice(0, 5) + "*".repeat(email.length - 5);
      return censurado;
    } else {
      // Se o email for menor que 5 caracteres, não faz nada
      return email;
    }
  }

});
