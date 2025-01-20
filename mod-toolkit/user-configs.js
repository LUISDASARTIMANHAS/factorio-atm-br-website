window.addEventListener("load", () => {
const form = document.getElementById("form");
const author = document.getElementById("author");
const pastaPDEntidades = document.getElementById("pastaPDEntidades");
const PastaPDGraficos = document.getElementById(
  "PastaPDGraficos"
);
const imgSize = document.getElementById("imgSize");
const stackSize = document.getElementById("stackSize");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    author: author.value,
    pastaPDEntidades: "data/" + pastaPDEntidades.value,
    pastaPDGraficos: "data/" + PastaPDGraficos.value,
    imgSize: imgSize.value,
    stackSize: stackSize.value,
  };
  const dataJson = JSON.stringify(data);
  localStorage.setItem("userConfigs", dataJson);
});
});