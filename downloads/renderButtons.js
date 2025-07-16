import { renderButton, renderIcon } from "../src/lib/render.js";

window.addEventListener("load", () => {
  try {
    const transferContainer = document.getElementById("transferencias");
    const btns = [
      {
        game: "FACTORIO SPACE AGE",
        types: ["zip", "exe"],
        disponivel: false
      },
      {
        game: "FACTORIO",
        types: ["zip", "exe"],
        disponivel: true,
      },
    ];
    transferContainer.innerHTML = "";

    btns.forEach(({ game, types, disponivel }) => {
      types.forEach((type) => {
        const divIconContainer = document.createElement("div");
        const divDownloadIcon = document.createElement("div");

        // configurações da div Icon Container
        divIconContainer.setAttribute(
          "class",
          "download-icon-container download-icon-type-expansion-container"
        );

        // configurações da div Download Icon
        divDownloadIcon.setAttribute("class", "download-icon-dotzip");

        createFont(divDownloadIcon, type);
        renderIcon(divIconContainer, "fab fa-windows");
        divIconContainer.appendChild(divDownloadIcon);
        createButton(divIconContainer, game, disponivel);
      });
    });

    function createFont(element, type) {
      const font = document.createElement("font");
      const subFont = document.createElement("font");
      // configurações da subFont
      subFont.textContent = `.${type}`;
      font.appendChild(subFont);
      element.appendChild(font);
    }

    function createButton(addElement, game, disponivel) {
      const btn = document.createElement("button");
      // configurações do btn
      if (disponivel) {
        btn.setAttribute("class", "button button-green");
      } else {
        btn.setAttribute("class", "button button-red");
        btn.disabled = true;
      }

      btn.textContent = game;
      btn.appendChild(addElement);
      // btn.addEventListener("click", downloadGame)
      transferContainer.appendChild(btn);
    }
  } catch (err) {
    console.error(err);
    alert(`ERRO FATAL: ${err}`);
  }
});
