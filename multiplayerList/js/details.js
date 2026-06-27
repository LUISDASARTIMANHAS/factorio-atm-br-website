// js\details.js

/**
 * Modal de detalhes do servidor.
 * @author Luis das Artimanhas
 */

"use strict";

/**
 * Cria badge Bootstrap.
 */
function createBadge(text, color = "primary") {
  return `
    <span class="badge bg-${color} me-1 mb-1">
      ${text}
    </span>
  `;
}

/**
 * Sim / Não
 */
function yesNo(value) {
  return value ? "Sim" : "Não";
}



/**
 * Modal de servidor
 */
async function showServer(server) {
  try {
    const detailedServer = await fetchServerDetails(server.game_id);

    const modal = new bootstrap.Modal(document.getElementById("serverModal"));

    const app = detailedServer.application_version || {};

    const address = detailedServer.host_address || "-";

    const playerList = Array.isArray(detailedServer.players)
      ? detailedServer.players
      : [];
    const playersCount = playerList.length ?? 0;
    const maxPlayers =
      detailedServer.max_players ?? detailedServer.maxPlayers ?? 0;


    const modsList = Array.isArray(detailedServer.mods)
      ? detailedServer.mods
      : [];

    const percent = maxPlayers
      ? Math.round((playersCount * 100) / maxPlayers)
      : 0;

    const headless = yesNo(detailedServer.headless_server);
    const hasPassword = yesNo(detailedServer.has_password);
    const isSteam = app.build_mode === "steam" ? "Sim" : "Não";

    const tags = (detailedServer.tags || [])
      .filter(Boolean)
      .map((tag) => createBadge(tag, "dark"))
      .join("");

    document.getElementById("modalTitle").innerHTML = `
      <i class="bi bi-hdd-network"></i>
      ${detailedServer.name || "Servidor"}
    `;

    document.getElementById("modalBody").innerHTML = `
<div class="container-fluid">

  <div class="row">

    <div class="col-lg-8">

      <h3 class="mb-3">${detailedServer.name || "-"}</h3>

      <p>${detailedServer.description || "Sem descrição."}</p>

      <div class="mb-3">
        ${tags}
      </div>

      <div class="progress mb-3">
        <div class="progress-bar bg-success" style="width:${percent}%">
          ${playersCount}/${maxPlayers}
        </div>
      </div>

      <!-- PLAYERS -->
      <div class="glass p-3 mb-3">
        <b>Jogadores online</b><br>

        ${
          playerList.length
            ? `
              <div class="d-flex flex-wrap gap-1 mt-2">
                ${playerList
                  .map((p) => `<span class="badge bg-info">${p}</span>`)
                  .join("")}
              </div>
            `
            : `<span class="text-muted">Nenhum jogador online</span>`
        }
      </div>

      <!-- MODS (CORRIGIDO) -->
      <div class="glass p-3 mb-3">
        <b>Mods (${modsList.length})</b><br>

        ${
          modsList.length
            ? `
              <div class="d-flex flex-wrap gap-1 mt-2">
                ${modsList
                  .slice(0, 50)
                  .map(
                    (m) =>
                      `<span class="badge bg-warning">${m.name} ${m.version}</span>`,
                  )
                  .join("")}
              </div>
            `
            : `<span class="text-muted">Vanilla</span>`
        }
      </div>

      <div class="row g-3">

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Versão</b><br>
            ${app.game_version || "-"}
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Build</b><br>
            ${app.build_version || "-"}
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Modo</b><br>
            ${app.build_mode || "-"}
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Plataforma</b><br>
            ${app.platform || "-"}
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Endereço</b><br>
            ${address}
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Headless</b><br>
            ${headless}
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Senha</b><br>
            ${hasPassword}
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass p-3">
            <b>Steam</b><br>
            ${isSteam}
          </div>
        </div>

      </div>

    </div>

    <div class="col-lg-4">

      <div class="glass p-4">

        <h5>Status</h5>
        <hr>

        <p><b>Jogadores</b><br>${playersCount}/${maxPlayers}</p>
        <p><b>Mods</b><br>${modsList.length}</p>
        <p><b>Headless</b><br>${headless}</p>
        <p><b>Senha</b><br>${hasPassword}</p>
        <p><b>Steam</b><br>${isSteam}</p>

        <button id="copyAddress" class="btn btn-primary w-100 mb-2">
          <i class="bi bi-copy"></i> Copiar endereço
        </button>

        <button id="connectServer" class="btn btn-success w-100">
          <i class="bi bi-controller"></i> Conectar
        </button>

      </div>

    </div>

  </div>

</div>
`;

    document.getElementById("copyAddress").onclick = async () => {
      await copyText(address);

      const btn = document.getElementById("copyAddress");
      btn.innerHTML = "Copiado!";

      setTimeout(() => {
        btn.innerHTML = `<i class="bi bi-copy"></i> Copiar endereço`;
      }, 1500);
    };

    document.getElementById("connectServer").onclick = () => {
      if (!address || address === "-") return;

      window.open(`steam://connect/${address}`, "_blank");
      navigator.clipboard.writeText(address).catch(() => {});
    };

    modal.show();
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar servidor: " + err.message);
  }
}
