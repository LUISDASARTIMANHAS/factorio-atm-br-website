const codeLabel = document.getElementById("codeError");
const body = document.querySelector("html");
const code = 701;

if (code == 404) {
  codeLabel.innerHTML = "404 NOT_FOUND";
} else if (code == 501) {
  codeLabel.innerHTML = "501 NÃO_IMPLEMENTADO";
} else if (code == 502) {
  codeLabel.innerHTML = "502 PORTÃO_DE_ENTRADA_RUIM";
} else if (code == 503) {
  codeLabel.innerHTML = "503 SERVIÇO_INDISPONÍVEL";
} else if (code == 504) {
  codeLabel.innerHTML = "504 TEMPO_LIMITE_DO_SERVIDOR";
} else if (code == 505) {
  codeLabel.innerHTML = "505 VERSÃO_HTTP_NÃO_SUPORTADA";
} else if (code == 555) {
  codeLabel.innerHTML = "555 SERVIDOR_SOBRECARREGADO";
} else if (code == 701) {
  codeLabel.innerHTML = "701 REINICIANDO_SERVIDOR";
} else {
  codeLabel.innerHTML = " PAGINA_SOBRE_MANUTENÇÃO";
  body.style.backgroundImage =
    "URL('https://cdn.glitch.global/59df7246-3def-4799-baad-d67e2fa48607/modo-de-manutencao.jpg?v=1676398474832')";
}

