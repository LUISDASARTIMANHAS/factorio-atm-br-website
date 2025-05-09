document.addEventListener("DOMContentLoaded", async () => {
  await loadMods();
});

async function loadMods() {
  try {
    const response = await fetch(
      "https://pingobras-factorio-server.glitch.me/mods"
    );
    const data = await response.json();

    // Extraindo o array de 'results' e passando para displayMods
    displayMods(data.results);
  } catch (error) {
    console.error("Erro ao carregar os mods:", error);
  }
}

async function searchMods() {
  try {
    const query = document.getElementById("searchInput").value;
    const response = await fetch(
      `https://pingobras-factorio-server.glitch.me/mods/${query}`
    );
    const mod = await response.json();

    // Verifique se a resposta é um objeto válido
    if (mod && mod.name) {
      displayMods([mod]); // Envie como array contendo um único mod
    } else {
      console.error("A resposta da API não é um mod válido: ", mod);
      alert("Erro: Mod não encontrado ou inválido.");
    }
  } catch (error) {
    console.error("Erro ao buscar o mod: ", error);
    alert("Erro ao buscar o mod.");
  }
}

function displayMods(mods) {
  const modListDiv = document.getElementById("modList");
  modListDiv.innerHTML = "";

  // Verificar se mods é um array
  if (Array.isArray(mods)) {
    mods.forEach((mod) => {
      const modDiv = document.createElement("div");
      modDiv.classList.add("mod-item");

      const modTitle = document.createElement("div");
      modTitle.classList.add("mod-title");
      modTitle.textContent = mod.name;

      const modDescription = document.createElement("div");
      modDescription.classList.add("mod-description");
      modDescription.textContent =
        mod.description || "Sem descrição disponível.";

      const downloadButton = document.createElement("button");
      downloadButton.classList.add("download-button");
      downloadButton.textContent = "Baixar";
      downloadButton.onclick = () => downloadMod(mod.name);

      modDiv.appendChild(modTitle);
      modDiv.appendChild(modDescription);
      modDiv.appendChild(downloadButton);

      modListDiv.appendChild(modDiv);
    });
  } else {
    console.error("Erro: A variável 'mods' não é um array válido.");
    alert("Erro: Dados inválidos para exibição.");
  }
}

function downloadMod(modName) {
  const url = `https://pingobras-factorio-server.glitch.me/download/mod/${modName}`;
  window.location.href = url; // Faz o download diretamente, sem abrir nova página
}
