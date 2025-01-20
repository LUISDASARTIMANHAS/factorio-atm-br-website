window.addEventListener("load", () => {
  const input = document.getElementById("inputUpload");
  const btnUpload = document.getElementById("btnUpload");
  const previewUpload = document.getElementById("previewUpload");
  const previewTotalSize = document.getElementById("totalSize");
  const timeRefresh = document.getElementById("timeRefresh");
  const duration = 6; // 60 minutos em segundos
  startCountdown(duration);

  input.style.opacity = 0;
  btnUpload.style.display = "none";
  input.addEventListener("change", preview);

  function preview() {
    // remove todos os itens anteriores listados
    while (previewUpload.firstChild) {
      previewUpload.removeChild(previewUpload.firstChild);
    }

    const files = input.files;
    // Verifique se nenhum arquivo foi selecionado, verificando se curFiles.lengthé igual a 0. Se for, imprima uma mensagem na visualização informando que nenhum arquivo foi selecionado.
    if (files.length === 0) {
      const pElement = document.createElement("p");

      btnUpload.style.display = "none";
      pElement.textContent =
        "Operação Cancelada, Nenhum arquivo foi selecionado!";
      previewUpload.appendChild(pElement);
    } else {
      // Se os arquivos foram selecionados, fazemos um loop por cada um, imprimindo informações sobre eles na pré-visualização. Coisas a serem observadas aqui:
      const listaElement = document.createElement("ol");
      let totalSize = 0;

      previewUpload.appendChild(listaElement);
      btnUpload.style.display = "";
      btnUpload.hidden = false;

      for (const file of files) {
        const liElement = document.createElement("li");
        const pElement = document.createElement("p");

        totalSize = totalSize + file.size;
        previewTotalSize.innerHTML = `${returnFileSize(totalSize)} / 2048MB`;
        //         Usamos a validFileType()função personalizada para verificar se o arquivo é do tipo correto (por exemplo, os tipos de zip especificados no acceptatributo).
        if (validFileType(file)) {
          // Imprima seu nome e tamanho de arquivo em um item de lista dentro do anterior <div>(obtido de file.namee file.size).
          pElement.textContent = `
          Arquivo ${file.name}, 
          ${returnFileSize(file.size)}.`;

          liElement.appendChild(pElement);
        } else {
          btnUpload.style.display = "none";
          btnUpload.hidden = true;
          pElement.textContent = `Arquivo ${file.type} - ${file.name}: Não é um tipo de arquivo válido. Atualize sua seleção.`;
          liElement.appendChild(pElement);
        }
        if (totalSize >= 1024 * 1024 * 2048) {
          btnUpload.style.display = "none";
          btnUpload.hidden = true;
          pElement.textContent =
            "Limite De Upload Ultrapassado! só e permitido 2GB";
          console.error("Limite De Upload Ultrapassado! só e permitido 2GB");
        }

        listaElement.appendChild(liElement);
      }
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/Media/Formats
  const fileTypes = window.env.fileTypes;

  function validFileType(file) {
    console.log(file.type);
    return fileTypes.includes(file.type);
  }

  // A returnFileSize() função personalizada retorna uma versão bem formatada do tamanho em bytes/KB/MB (por padrão, o navegador relata o tamanho em bytes absolutos).
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
  function returnFileSize(number) {
    if (number < 1e3) {
      return `${number} bytes`;
    } else if (number >= 1e3 && number < 1e6) {
      return `${(number / 1e3).toFixed(1)} KB`;
    } else {
      return `${(number / 1e6).toFixed(1)} MB`;
    }
  }

  function startCountdown(durationInMinutes) {
    let timeRemaining = durationInMinutes * 60;

    const countdownInterval = setInterval(function () {
      const hours = Math.floor(timeRemaining / 3600);
      const minutes = Math.floor((timeRemaining % 3600) / 60);
      const seconds = timeRemaining % 60;
      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      console.log(time);
      timeRefresh.innerHTML = time;

      timeRemaining--;

      if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        console.log("Tempo esgotado!");
        timeRefresh.innerHTML = "Tempo esgotado! Recarregando Site!";
      }
    }, 1000);
  }
});
