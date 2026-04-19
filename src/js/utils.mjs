import config from "./config.js";

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomBin(max) {
  return Math.floor(Math.random() * max).toString(2);
}

export function getRandomHex(max) {
  return Math.floor(Math.random() * max).toString(16);
}

export function getRandomID() {
  const date = new Date();
  const time = date.getTime();
  return getRandomInt(time);
}

export function alternarVisibilidade(visivel) {
  const body = document.querySelector("body");
  if (body) {
    if (visivel) {
      body.hidden = false;
    } else {
      body.hidden = true;
      body.style.display = "none";
    }
  }
}

export function getAuthorizationHeader() {
    const combined = `${config.encodedUser}:${config.encodedPassword}`;
    const doubleEncoded = btoa(btoa(combined));
    return `Basic ${doubleEncoded}`;
  }

export function gerarNonce() {
  const date = new Date();
  return date.getUTCHours() * date.getFullYear() * getRandomID();
}

export function formMessage(message) {
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  if (msgError && msgSuccess) {
    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = message;
    msgSuccess.setAttribute("style", "display: block");
  }
}

export function formMessageError(error) {
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  if (msgError && msgSuccess) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = error;
    msgSuccess.setAttribute("style", "display: none");
  }
}

export function montarHeaders(path) {
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
  };

  if (path.startsWith("api/")) {
    headers["Authorization"] = getAuthorizationHeader();
    headers["x-nonce"] = gerarNonce();
    headers["x-timestamp"] = Date.now().toString();
  }

  return headers;
}

export async function enviarDados(path, rawPayload) {
  try {
    const url = `${config.serverUrl}/${path}`;

    formMessage("Aguardando Servidor....");
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: montarHeaders(path),
      body: JSON.stringify(rawPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`[enviarDados] erro ${res.status} /${path}:`, data);
      return { error: true, status: res.status, data };
    }

    console.log(`[enviarDados] sucesso /${path}:`, data);
    return data;
  } catch (error) {
    console.error(`[enviarDados] falha /${path}:`, error);
    formMessageError(error);
    return { error: true, message: error.message };
  }
}

export async function sendApi(path,rawPayload) {
  // middleware no estilo router.use("/api", api); que obriga usar a rota
  return await enviarDados(`api/${path}`,rawPayload);
}

export async function sendApiAuth(path,rawPayload) {
  // middleware no estilo router.use("/api/auth", auth); que obriga usar a rota auth
  return await sendApi(`auth/${path}`,rawPayload);
}

export async function obterDados(path) {
  try {
    const url = `${config.serverUrl}/${path}`;

    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: montarHeaders(path),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`[obterDados] erro ${res.status} /${path}:`, data);
      return { error: true, status: res.status, data };
    }

    console.log(`[obterDados] sucesso /${path}:`, data);
    return data;
  } catch (error) {
    console.error(`[obterDados] falha /${path}:`, error);
    formMessageError(error);
    return { error: true, message: error.message };
  }
}

export async function getStatus() {
  return await obterDados("status");
}

export async function getStatusManutencao() {
  return await obterDados("manutencao");
}
