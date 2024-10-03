(() => {
  const url = "https://pingobras-sg.glitch.me/status";
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  };
  fetch(url, options)
    .then((response) => {
      if (response.status == 200) {
        redirectOffline(false);
      } else {
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
