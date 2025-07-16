import { renderLinkCss } from "../lib/render.js";
(() => {
  const head = document.querySelector("head");
  const isGithubPages = location.hostname.includes("github.io");
  const fonteUser = isGithubPages
    ? `${window.location.origin}/factorio-atm-br-website/src/js`
    : "/src";
  const srcs = ["style", "presets", "animations", "scrollbar"];
  const srcsLinksFonts = ["bootstrap@5.3.3"];
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

})();
