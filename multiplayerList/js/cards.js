/**
 * Renderização dos cards dos servidores.
 * @author Luis das Artimanhas
 */

"use strict";

const serversContainer = document.getElementById("serversContainer");

const SAFE_LIMIT = 150;

/**
 * Escapa HTML.
 */
function escapeHtml(text = "") {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Cria badge Bootstrap.
 */
function badge(text, color) {
  return `
    <span class="badge bg-${color}">
      ${escapeHtml(text)}
    </span>
  `;
}

/**
 * Percentual de players.
 */
function playerPercent(server) {
  const max = server?.maxPlayers || 0;
  const current = server?.playerCount || 0;

  if (max <= 0) return 0;

  return Math.min(Math.round((current * 100) / max), 100);
}

/**
 * Cor da barra.
 */
function progressColor(value) {
  if (value < 40) return "bg-success";
  if (value < 80) return "bg-warning";
  return "bg-danger";
}

/**
 * Renderiza cards.
 */
function renderCards(list) {
  serversContainer.innerHTML = "";

  if (!Array.isArray(list) || list.length === 0) {
    serversContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning">
          Nenhum servidor encontrado.
        </div>
      </div>
    `;
    return;
  }

  const safeList = list.slice(0, SAFE_LIMIT);

  safeList.forEach((server, index) => {
    const percent = playerPercent(server);

    const tags = server.tags || [];
    const description = server.description || "Sem descrição.";

    const players = Array.isArray(server.players) ? server.players : [];

    const MAX_VISIBLE_PLAYERS = 255;
    const visiblePlayers = players.slice(0, MAX_VISIBLE_PLAYERS);
    const hiddenPlayers = players.length - visiblePlayers.length;

    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6";

    card.innerHTML = `
      <div class="glass p-4 h-100 server-card fade-in">

        <div class="d-flex justify-content-between">
          <div>
            <h5 class="server-title">
              ${escapeHtml(server.name)}
            </h5>

            <div class="small-info">
              ${server.dedicated ? "Dedicated Server" : "Servidor"}
            </div>
          </div>

          <i class="bi bi-hdd-network display-6 card-icon"></i>
        </div>

        <hr>

        <p class="server-description">
          ${escapeHtml(description)}
        </p>

        <div class="d-flex flex-wrap gap-2 mb-3">
          ${badge(`👥 ${server.playerCount}/${server.maxPlayers}`, "primary")}

          ${badge(
            server.hasMods ? `🧩 ${server.modCount} Mods` : "Vanilla",
            server.hasMods ? "warning" : "success"
          )}

          ${badge(
            server.hasPassword ? "🔒 Senha" : "🔓 Livre",
            server.hasPassword ? "danger" : "success"
          )}

          ${badge(server.version, "secondary")}
        </div>

        <div class="progress mb-3">
          <div
            class="progress-bar ${progressColor(percent)}"
            style="width:${percent}%">
          </div>
        </div>

        <div class="mb-3">
          <div class="small text-muted mb-1">
            Jogadores online
          </div>

          ${
            players.length > 0
              ? `
                <div class="d-flex flex-wrap gap-1">
                  ${visiblePlayers.map(p => badge(p, "info")).join("")}
                  ${
                    hiddenPlayers > 0
                      ? `<span class="badge bg-dark">+${hiddenPlayers}</span>`
                      : ""
                  }
                </div>
              `
              : `<div class="small text-muted">Sem jogadores ativos</div>`
          }
        </div>

        <div class="d-flex flex-wrap gap-2 mb-4">
          ${tags.map(tag => badge(tag, "dark")).join("")}
        </div>

        <div class="text-end">
          <button class="btn btn-primary">
            <i class="bi bi-search"></i>
            Ver detalhes
          </button>
        </div>

      </div>
    `;

    card.querySelector("button").addEventListener("click", () => {
      showServer(server.server_id);
    });

    card.style.animationDelay = index * 0.05 + "s";

    serversContainer.appendChild(card);
  });
}