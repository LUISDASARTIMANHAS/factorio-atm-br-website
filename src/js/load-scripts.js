(() => {
  const autoscripts = document.querySelector("autoscripts");
  const fonteUser = "/src/js/";
  const srcsUser = [
    "manutencao-redirect",
    "functions",
    "offline",
    "message",
    "config"
  ];

  for (let i = 0; i < srcsUser.length; i++) {
    var newScript = document.createElement("script");

    newScript.setAttribute("src", fonteUser + srcsUser[i] + ".js");
    autoscripts.appendChild(newScript);

    console.log(" Novo Script Num: " + srcsUser[i]);
  }
})();
