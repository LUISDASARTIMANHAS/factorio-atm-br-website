import { renderLinkCss } from "../lib/render.js";
(() => {
  const url = "../src/data/info.json";
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((errorText) => {
          throw new Error("Erro ao fazer buscar hostname: " + errorText);
        });
      }
    })
    .then((data) => {
      importarCss(data);
    })
    .catch((error) => onErrorHostname(error));

  function onErrorHostname(error) {
    console.debug(error);
  }
})();

function importarCss(data) {
  const linksContainer = document.querySelector("links");
  const head = document.querySelector("head");
  const hostname =
    data.hostname ||
    "luisdasartimanhas.github.io/PINGOBRAS" ||
    "betapingobras.onrender.me";
  const srcs = ["style", "presets", "animations", "scrollbar"];
  const srcsLinksFonts = ["5.3.3/css/font-awesome.min"];

  srcs.forEach((src) => {
    const link = `https://${hostname}/src/css/${src}.css`;
    renderLinkCss(linksContainer, link);

    console.log(`%c [SISTEMA]: Carregando css: ${link}`, "color: #ff00ff");
  });

  srcsLinksFonts.forEach((src) => {
    const link = `https://stackpath.bootstrapcdn.com/font-awesome/${src}.css`;

    renderLinkCss(head, link);
    console.log(
      `%c [SISTEMA]: Novo Link de fonte css Num: ${link}`,
      "color: #ff00ff"
    );
  });
}
