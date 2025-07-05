(() => {
  const autoscripts = document.querySelector("autoscripts");
  const fonteUser = "/factorio-atm-br-website/src/js/";
  const srcModule = [
    "manutencao-redirect",
    "offline",
    "message",
    "ip-info",
  ];
  const srcCJS = [
    "functions",
  ];

  for (let i = 0; i < srcModule.length; i++) {
    var newScript = document.createElement("script");
    var url = fonteUser + srcModule[i] + ".js";

    newScript.setAttribute("src",url );
    newScript.setAttribute("type", "module"); // ESSENCIAL para usar export/import
    autoscripts.appendChild(newScript);

    console.log(`%c [SISTEMA ATM BR]: Novo script ESM: ${url}`,"#ffaa00")
  }

  for (let i = 0; i < srcCJS.length; i++) {
    var newScript = document.createElement("script");
    var url = fonteUser + srcCJS[i] + ".js";

    newScript.setAttribute("src",url );
    autoscripts.appendChild(newScript);

    console.log(`%c [SISTEMA ATM BR]: Novo script: ${url}`,"#ffaa00")
  }
})();