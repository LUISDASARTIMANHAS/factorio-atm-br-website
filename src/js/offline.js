(() => {
  const body = document.querySelector("body");
  const btns = document.querySelectorAll("button");
  const url = "https://pingobras-factorio-server.glitch.me/status";
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      "X-Disable-Cache": "true", // Desativando o cache via cabeçalho
    },
  };

  body.style.cursor = "wait";
  fetch(url, options)
    .then((response) => {
      if (response.status == 200) {
        body.style.cursor = "default";
        redirectOffline(false);

        btns.forEach((btn) => {
          btn.disabled = false;
        });
      } else {
        console.log("SERVER STATUS OFFLINE");
        redirectOffline(true);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  function redirectOffline(offline) {
    const body = document.querySelector("body");

    if (offline) {
      body.hidden = true;

      if (body) {
        body.style.display = "none";
      }

      setTimeout(() => {
        window.location.href = "/sys/offline.html";
      }, 5000);
    }
  }
  redirectOffline(false);
})();
