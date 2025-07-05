(() => {
  const autoscripts = document.querySelector("autoscripts");
  const fonteUser = "/factorio-atm-br-website/src/js/";
  const src = [
    "manutencao-redirect",
    "offline",
    "message",
    "ip-info",
    "functions",
  ];

  for (let i = 0; i < src.length; i++) {
    var newScript = document.createElement("script");
    var url = fonteUser + src[i] + ".js";

    newScript.setAttribute("src",url );
    newScript.setAttribute("type", "module"); // ESSENCIAL para usar export/import
    autoscripts.appendChild(newScript);

    console.log(`%c [SISTEMA ATM BR]: Novo script: ${url}`,"#ffaa00")
  }
})();