window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const previewAuthor = document.getElementById("previewAuthor");
  const previewPastaPDEntidades = document.getElementById(
    "previewPastaPDEntidades"
  );

  const previewPastaPDGraficos = document.getElementById(
    "previewPastaPDGraficos"
  );
  const previewImgSize = document.getElementById("previewImgSize");
  const previewStackSize = document.getElementById("previewStackSize");
  
  form.addEventListener("input",loadST);

  function loadST() {
    const database = localStorage.getItem("userConfigs");
    const data = JSON.parse(database);
    const author = data.author;
    const pastaPDEntidades = data.pastaPDEntidades;
    const pastaPDGraficos = data.pastaPDGraficos;
    const imgSize = data.imgSize;
    const stackSize = data.stackSize;

    previewAuthor.innerHTML = author;
    previewPastaPDEntidades.innerHTML = pastaPDEntidades;
    previewPastaPDGraficos.innerHTML = pastaPDGraficos;
    previewImgSize.innerHTML = imgSize;
    previewStackSize.innerHTML = stackSize;
  }

  loadST();
});
