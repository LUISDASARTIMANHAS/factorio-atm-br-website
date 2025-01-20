(() => {
  const body = document.querySelector("body");
  const url = "https://pingobras-sg.glitch.me/status";
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  };
  
  body.style.cursor = "wait";
  fetch(url, options)
    .then((response) => {
      if (response.status == 200) {
        body.style.cursor = "default";
        redirectOffline(false);
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