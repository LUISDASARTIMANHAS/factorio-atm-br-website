import { renderLinkCss } from "../lib/render.js";
(() => {
  const head = document.querySelector("head");
  const isGithubPages = location.hostname.includes("github.io");
  const fonteUser = isGithubPages
    ? `${window.location.origin}/factorio-atm-br-website/src/js`
    : "/src";
  const srcs = ["style", "presets", "animations", "scrollbar"];
  const srcsLinksFonts = ["5.3.3/css/font-awesome.min"];
  const fonts = ["fontawesome","titillium-web"];

  if (!head) {
    return;
  }

  srcs.forEach((src) => {
    const link = `${fonteUser}/css/${src}.css`;
    renderLinkCss(head, link);

    console.log(`%c [SISTEMA]: Carregando css: ${link}`, "color: #ffaa00");
  });

  // carregar fontes para o site
  fonts.forEach((src) => {
    const link = `${fonteUser}/fonts/${src}.css`;
    renderLinkCss(head, link);

    console.log(`%c [SISTEMA]: Carregando Fontes css: ${link}`, "color: #ffaa00");
  });

  srcsLinksFonts.forEach((src) => {
    const link = `https://stackpath.bootstrapcdn.com/font-awesome/${src}.css`;

    renderLinkCss(head, link);
    console.log(
      `%c [SISTEMA]: Novo Link de fonte css Num: ${link}`,
      "color: #ff00ff"
    );
  });
})();
