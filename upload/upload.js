window.addEventListener("load", () => {
  try {
    const form = document.getElementById("formUpload");
    const btnUpload = document.getElementById("btnUpload");
    const labelProgresso = document.getElementById("progresso");
    const inputUpload = document.getElementById("inputUpload");
    const StatusUP = document.getElementById("statusUP");
    const progressBar = document.getElementById("progressBar");
    const respostaServidor = document.getElementById("response");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const files = inputUpload.files; // Obter os arquivos do input
      if (files.length > 0) {
        btnUpload.style.display = "none";
        btnUpload.hidden = true;
        labelProgresso.style.display = "";
        labelProgresso.hidden = false;
        StatusUP.innerHTML = "Carregando Arquivo...";
        upload(files);
      } else {
        alert("ERRO FATAL: Nenhum arquivo selecionado!");
      }
    });

    function upload(files) {
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "https://file.io", true);
      xhttp.setRequestHeader(
        "Authorization",
        "Bearer " + atob(atob(window.env.api_key))
      );
      xhttp.setRequestHeader("accept", "application/json");

      // Evento para monitorar progresso do upload
      xhttp.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          console.log(event);
          var percentComplete = (event.loaded / event.total) * 100;
          console.log(`Upload: ${percentComplete.toFixed(2)}% concluído`);
          progressBar.value = percentComplete;
          StatusUP.innerHTML = `${percentComplete.toFixed(2)}%`;
        } else {
          console.log("Progresso do upload não é computável.");
        }
      };

      // Evento quando a requisição completa
      xhttp.onload = function () {
        if (xhttp.status == 200) {
          const response = JSON.parse(xhttp.responseText); // Converta se for JSON

          uploadMessage(
            `Upload completo!  ${JSON.stringify(response, null, 2)}`
          );
          StatusUP.innerHTML = "Upload completo!";
          respostaServidor.innerHTML = `<pre>Resposta do servidor: ${JSON.stringify(
            response,
            null,
            2
          )}</pre>`;
          console.log("Upload completo!", response);
        } else {
          uploadMessage(
            `Erro no upload: ${xhttp.status} - ${xhttp.statusText}`
          );
          StatusUP.innerHTML = `Erro no upload: ${xhttp.status} - ${xhttp.statusText}`;
          respostaServidor.innerHTML = `<pre>Erro: ${xhttp.responseText}</pre>`;
          console.error("Erro no upload:", xhttp.responseText);
        }
        finalizarUpload();
      };

      // Evento para tratar erros de conexão
      xhttp.onerror = function () {
        StatusUP.innerHTML = "Erro de conexão! Verifique sua internet.";
        console.error("Erro de conexão durante o upload.");
        finalizarUpload();
      };

      // Evento para tratar caso o upload seja abortado
      xhttp.onabort = function () {
        StatusUP.innerHTML = "Upload abortado!";
        uploadMessage("O upload foi abortado pelo usuário ou servidor.");
        console.warn("O upload foi abortado pelo usuário ou servidor.");
        finalizarUpload();
      };

      // Enviar os dados
      const data = new FormData();
      let totalSize = 0;
      for (const file of files) {
          totalSize = totalSize + file.size;
        if (validFileType(file)) {
          data.append("file", file);
        } else {
          StatusUP.innerHTML = "Tipo de arquivo inválido!";
          console.error("Tipo de arquivo inválido:", file.name);
          finalizarUpload();
          return;
        }
        if (totalSize >= 1024*1024*2048) {
          StatusUP.innerHTML =
            "Limite De Upload Ultrapassado! só e permitido 2GB";
          console.error("Limite De Upload Ultrapassado! só e permitido 2GB");
          finalizarUpload();
          return;
        }
      }
      uploadMessage("Upload Started!");
      xhttp.send(data);
    }
    // Função para finalizar e resetar estado
    function finalizarUpload() {
      labelProgresso.style.display = "none";
      labelProgresso.hidden = true;
      btnUpload.style.display = "";
      btnUpload.hidden = false;
    }

    // https://developer.mozilla.org/en-US/docs/Web/Media/Formats
      const fileTypes = window.env.fileTypes;


    function validFileType(file) {
      console.log(file.type);
      return fileTypes.includes(file.type);
    }

    async function uploadMessage(msg) {
      await window.factorio_message("UPLOAD", msg);
    }
  } catch (err) {
    alert("ERRO INTERNO FATAL! REPORTE O BUG AO ADMINISTRADOR DO SITE: " + err);
  }
});
