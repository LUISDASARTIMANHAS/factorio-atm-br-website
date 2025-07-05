(() => {
  const url =
    "../src/data/info.json";
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
  const links = document.querySelector("links");
  const hostname =
    data.hostname ||
    "luisdasartimanhas.github.io/PINGOBRAS"||
    "betapingobras.onrender.me";
  const fonte = `https://${hostname}/src/css/`;
  const srcs = [
    "style",
    "presets",
    "animations",
    "scrollbar",
  ];
  const srcsLinksFonts = ["4.7.0/css/font-awesome.min.css"];

  for (let i = 0; i < srcs.length; i++) {
    const src = srcs[i];
    const link = fonte + src + ".css";
    var newLink = document.createElement("link");

    newLink.setAttribute("href", link);
    newLink.rel = "stylesheet";
    links.appendChild(newLink);

    console.log(`%c [SISTEMA]: Carregando css: ${link}`, "color: #ff00ff");
  }

  for (let i = 0; i < srcsLinksFonts.length; i++) {
    const head = document.querySelector("head");
    var newLink = document.createElement("link");

    newLink.setAttribute(
      "href",
      "https://stackpath.bootstrapcdn.com/font-awesome/" + srcsLinksFonts[i]
    );
    newLink.rel = "stylesheet";
    head.appendChild(newLink);

    console.log(
      `%c [SISTEMA]: Novo Link de fonte css Num: " + srcsLinksFonts[i]`,
      "color: #ff00ff"
    );
  }
}
