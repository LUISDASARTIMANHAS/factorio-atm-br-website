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

export async  function obterDados(path) {
  try {
    const url = `${config.serverUrl}/${path}`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    };

    let res = await fetch(url, options);
    console.log(`%c [obterDados] /${path}: ${res}`, "color: #00ff00");
    return res
  } catch (error) {
    console.error(`%c [obterDados] /${path}: ${error}`, "color: #ff0000");
    return error
  }
}

export async function getStatus() {
  return obterDados("status");
}

export async function getStatusManutencao() {
  return obterDados("manutencao");
}
