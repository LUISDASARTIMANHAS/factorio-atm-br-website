(() => {
  const btndev = document.getElementById("btndev");
  const linkIP = document.getElementById("linkIP");
  const navApp = document.getElementById("navigator-app");
  const cidadeLabel = document.getElementById("city");
  const paisLabel = document.getElementById("pais");
  const regiaoLabel = document.getElementById("regiao");
  const timezoneLabel = document.getElementById("timezone");
  const locationLabel = document.getElementById("location");
  const IPLabel = document.getElementById("IP");
  const HostIPLabel = document.getElementById("HostIP");
  const postalLabel = document.getElementById("postal");
  const ISPLabel = document.getElementById("ISP");

  let iP,
    cidade,
    pais,
    regiao,
    timezone,
    location,
    hostIP,
    postal,
    iSP = null;

  function getIPStats() {
    const url = "https://ipinfo.io/json?token=f1dd48b5ecd676";
    const date = new Date();
    const id = Math.floor(Math.random() * 20242002);
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
            throw new Error("Erro ao obter analytics: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        iP = data.ip;
        cidade = data.city;
        pais = data.country;
        regiao = data.region;
        timezone = data.timezone;
        location = data.loc;
        hostIP = data.hostname;
        postal = data.postal;
        iSP = data.org;
        // exportando dados
        localStorage.setItem("ipinfo",JSON.stringify(data));

        infoIP();
      })
      .catch((error) => {
        console.debug(`%c [SISTEMA] ${error}`, "color: #ff0000");
      });
  }
  getIPStats();

  function infoIP() {
    if (cidadeLabel) {
      cidadeLabel.innerHTML = cidade;
    }
    if (paisLabel) {
      paisLabel.innerHTML = pais;
    }
    if (regiaoLabel) {
      regiaoLabel.innerHTML = regiao;
    }
    if (timezoneLabel) {
      timezoneLabel.innerHTML = timezone;
    }
    if (locationLabel) {
      locationLabel.innerHTML = location;
    }
    if (IPLabel) {
      IPLabel.innerHTML = iP;
      if (linkIP) {
        linkIP.href = "http://" + linkIP.name;
        linkIP.name = iP;
      }
    }
    if (HostIPLabel) {
      HostIPLabel.innerHTML = hostIP;
    }
    if (postalLabel) {
      postalLabel.innerHTML = postal;
    }
    if (ISPLabel) {
      ISPLabel.innerHTML = iSP;
    }
    if (navApp) {
      navApp.innerHTML = navigator.appCodeName;
    }

    if (cidade == "Colatina" || cidade == "colatina") {
      btndev.hidden = false;
    }
  }
})();
