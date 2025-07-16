import { renderScript } from "../lib/render.js";

(() => {
  const autoscripts = document.querySelector("autoscripts");
  const isGithubPages = location.hostname.includes("github.io");
  const fonteUser = isGithubPages
    ? `${window.location.origin}/factorio-atm-br-website/src/js`
    : "/src/js";

  const srcsModule = ["manutencao-redirect", "offline", "message", "ip-info"];
  const srcsCJS = ["functions"];

  srcsModule.forEach((srcModule) => {
    var url = `${fonteUser}/${srcModule}.js`;
    renderScript(autoscripts, url, true);

    console.log(`%c [SISTEMA ATM BR]: Novo script ESM: ${url}`, "#ffaa00");
  });

  srcsCJS.forEach((srcCJS) => {
    var url = `${fonteUser}/${srcCJS}.js`;

    renderScript(autoscripts, url);

    console.log(`%c [SISTEMA ATM BR]: Novo script: ${url}`, "#ffaa00");
  });
})();
