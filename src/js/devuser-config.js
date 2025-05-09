window.addEventListener("load", () => {
  try {
    const awaitSeconds = 21;

    genBarAtt();
    localStorage.setItem("dev", true);
    setTimeout(function () {
      window.location.href = "/"
    }, awaitSeconds * 1000);

    function genBarAtt() {
      const bar = document.getElementById("devconfig");
      const msPerPercent = 200;

      bar.style.animation = "disabled";
      for (let i = 0; i < 101; i++) {
        setTimeout(() => {
          bar.style.width = i + "%";
          bar.textContent = `Atualizando Configs...${i}% `;
        }, i * msPerPercent);
      }
    }

    function getPercent(value, total) {
      return (value / total) * 100;
    }
    function onError(error) {
      console.debug(error);
      alert(error);
    }
  } catch (err) {
    alert(
      "ERRO INTERNO FALTAL: " + err + "\n CONTATE O ADMINISTRADOR DO SITE!"
    );
  }
});
