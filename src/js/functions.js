const Subir = document.getElementById("back-to-top");
const Descer = document.getElementById("jsDescer");
const btnALL = document.querySelectorAll("button");
const AreasDeTextos = document.getElementsByTagName("textarea");
const inputsFiles = document.querySelectorAll("#fileInput");

// inicialização de variaveis em cache global LOCAL STORAGE
localStorage.setItem("debugMode", false);

const alarm = new Audio(
  "https://github.com/LUISDASARTIMANHAS/LUISDASARTIMANHAS/raw/refs/heads/main/SFX/Shop%20empire%202%20-%20Alarm.mp3"
);
const ClickMouseFUNCTIONS = new Audio(
  "https://github.com/LUISDASARTIMANHAS/LUISDASARTIMANHAS/raw/refs/heads/main/SFX/click%20do%20mouse.mp3"
);

function redirectUrl(url) {
  ClickMouseFUNCTIONS.play();
  window.location.href = url;
}

function FullScreen() {
  document.documentElement.requestFullscreen();
}

function montarFile(event) {
  const formData = new FormData();
  const selectedFiles = event.target.files[0];
  const name = selectedFiles.name;
  const type = selectedFiles.type;
  const size = selectedFiles.size;
  const lastModifiedDate = selectedFiles.lastModifiedDate;
  const lastModified = selectedFiles.lastModified;

  console.log("UPLOAD/STATUS");
  console.log("Nome: " + name);
  console.log("Tipo: " + type);
  console.log("Tamanho: " + size);
  console.log("Data de modificação: " + lastModifiedDate);
  console.log("Ultima vez modificado: " + lastModified);

  formData.append("file", selectedFiles);
  formData.append("size", selectedFiles.size.toString());
  return formData;
}

//======================= Events listener =====================

// addEventListener
// se os btns existirem
if (btnALL) {
  btnALL.forEach((btn) => {
    console.log(btn);
    addSoundClicker(btn);
  });
}
if (inputsFiles) {
  inputsFiles.forEach((inpFile) => {
    inpFile.addEventListener("change", montarFile);
  });
}

if (AreasDeTextos) {
  AreasDeTextos.forEach((AreaDeTexto) => {
    AreaDeTexto.style.height = AreaDeTexto.scrollHeight;
    AreaDeTexto.addEventListener("input", AoDigitar, false);
    AreaDeTexto.value = "";
  });
}

if (Subir) {
  Subir.addEventListener("click", function () {
    ClickMouseFUNCTIONS.play();
    window.scrollTo(0, 0);
    console.log("FUNCTIONS/LOG> O Usuario foi redirecionado para cima!");
  });
}
if (Descer) {
  Descer.addEventListener("click", function () {
    ClickMouseFUNCTIONS.play();
    window.scrollTo(0, 3000);
    console.log("FUNCTIONS/LOG> O Usuario foi redirecionado para baixo!");
  });
}

function AoDigitar() {
  console.warn("Redimensionamento Automático Ativado!");
  this.style.height = 0;
  this.style.height = this.scrollHeight + 20 + "px";
}

function addSoundClicker(button) {
  button.addEventListener("click", () => {
    ClickMouseFUNCTIONS.play();
    console.log("Clicou no botão!");
  });
}
