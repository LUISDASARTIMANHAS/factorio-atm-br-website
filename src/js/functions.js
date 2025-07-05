const Subir = document.getElementById("back-to-top");
const Descer = document.getElementById("jsDescer");
const btnALL = document.querySelectorAll("button");
const AreaDeTexto = document.getElementsByTagName("textarea");
const inpFile = document.getElementById("fileInput");
const WindowSongError1 = new Audio(
	"https://cdn.glitch.global/b39d6a4a-0e14-4b41-930d-29d3ccd6c137/Windows-error-song?v=1656019161212.mp3?v=1651870846885.mp3"
);
const alarm = new Audio(
	"https://cdn.glitch.global/b39d6a4a-0e14-4b41-930d-29d3ccd6c137/Shop empire 2 - Alarm.mp3?v=1660420687299.mp3"
);
const ClickMouseFUNCTIONS = new Audio(
	"https://cdn.glitch.global/b39d6a4a-0e14-4b41-930d-29d3ccd6c137/click%20do%20mouse.mp3?v=1661006466474"
);

function mostrarsenha() {
	let inputSenha = document.getElementById("senha");
	ClickMouseFUNCTIONS.play();

	if (inputSenha.getAttribute("type") == "password") {
		inputSenha.setAttribute("type", "text");
		inputSenha.placeholder = "1234";
	} else {
		inputSenha.setAttribute("type", "password");
		inputSenha.placeholder = "****";
	}
}

btnALL.forEach((btn) => {
	if (btn) {
		console.log(btn);
		addSoundClicker(btn);
	}
});
for (let i = 0; i < AreaDeTexto.length; i++) {
	AreaDeTexto[i].style.height = AreaDeTexto[i].scrollHeight;
	AreaDeTexto[i].addEventListener("input", AoDigitar, false);
	this.value = "";
}

function pageYT() {
	ClickMouseFUNCTIONS.play();
	window.location.href = "/user/video-player";
}
function pageLives() {
	ClickMouseFUNCTIONS.play();
	window.location.href = "/user/live";
}
function redirectUrl(url) {
	ClickMouseFUNCTIONS.play();
	window.location.href = url;
}

function FullScreen() {
	document.documentElement.requestFullscreen();
}

window.montarFile = function montarFile(event) {
	const formData = new FormData();
	const url = inpFile.attributes["data-url"].value;
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

	const options = {
		method: "POST",
		body: formData,
	};
	fetch(url, options)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then((data) => {
			console.log("DATA RESPONSE: ");
			console.log(data);
			localStorage.setItem("mySenderDB", JSON.stringify(data));
		})
		.catch((error) => {
			console.debug(error);
		});
};

//======================= Events listener =====================
if (inpFile) {
	inpFile.addEventListener("change", window.montarFile);
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