import config from "./config.js";

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

export function montarHeaders(path) {
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
  };

  if (path.startsWith("api/")) {
    // headers["x-nonce"] = gerarNonce();
    headers["x-timestamp"] = Date.now().toString();
  }

  return headers;
}

export async function obterDados(path) {
  try {
    const url = `${config.serverUrl}/${path}`;

    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: montarHeaders(path),
    });

    const data = await res.json(); // <- aqui está a correção principal

    if (!res.ok) {
      console.error(`[obterDados] erro ${res.status} /${path}:`, data);
      return { error: true, status: res.status, data };
    }

    console.log(`[obterDados] sucesso /${path}:`, data);
    return data;
  } catch (error) {
    console.error(`[obterDados] falha /${path}:`, error);
    return { error: true, message: error.message };
  }
}

export async function getStatus() {
  return await obterDados("status");
}

export async function getStatusManutencao() {
  return await obterDados("manutencao");
}
