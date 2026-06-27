import {
  enviarDados,
  formMessage,
  getCookie,
  getRandomHex,
  getRandomInt,
  sendApiAuth,
  setCookie,
} from "../src/js/utils.mjs";

window.addEventListener("load", async () => {
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

  async function getData() {
    const inpEmail = document.getElementById("email");
    const payloadLogin = {
      email: inpEmail.value,
      type: "user",
    };

    // loginMessage(`${censurarEmail(inpEmail.value)} Pediu um magic Link!`);
    const response = await sendApiAuth("request-code", payloadLogin);
    const isOk = !response?.error;
    if (isOk) {
      form.hidden = true;
      formCode.hidden = false;
    }
  }

  async function sendCode() {
    const inpEmail = document.getElementById("email");
    const inpCode = document.getElementById("code");
    const payloadLogin = {
      email: inpEmail.value,
      code: inpCode.value,
    };

    // await loginMessage(
    //   censurarEmail(inpEmail.value) + " está tentando fazer login!",
    // );
    const response = await sendApiAuth("verify-code", payloadLogin);
    const isOk = !response?.error;
    if (isOk) {
      autenticar(response);
    }
  }

  function autenticar(userLogado) {
    const manterConectado = document.getElementById("continueConnected");
    const dataUserJson = JSON.stringify(userLogado);

    localStorage.setItem("token", userLogado.token);
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
