import { createBadge } from "../components/base/badge.js";
import { createButton } from "../components/base/button.js";
import { createElement } from "../components/base/dom-utils.js";
import { createHeading } from "../components/base/heading.js";
import { createParagraph } from "../components/base/paragraph.js";
import { createStrong } from "../components/base/strong.js";

function yesNo(value) {
  return value ? "Sim" : "Não";
}

function createInfoTile(label, value) {
  const tile = createElement("div", "glass p-3", null, {}, [
    createStrong(label),
    createElement("br"),
    createElement("span", "", String(value ?? "-")),
  ]);

  return createElement("div", "col-md-6", null, {}, [tile]);
}

function createDetailSection(title, content) {
  return createElement("div", "glass p-3 mb-3", null, {}, [
    createStrong(title),
    createElement("div", "d-flex flex-wrap gap-1 mt-2", null, {}, content),
  ]);
}

function createStatusLine(label, value) {
  return createParagraph(`${label}: ${value}`);
}

/**
 * Exibe os detalhes de um servidor no modal.
 * @param {Object} server
 * @returns {Promise<void>}
 */
async function showServer(server) {
  try {
    const detailedServer = await window.fetchServerDetails(server.game_id);
    const app = detailedServer.application_version || {};
    const address = detailedServer.host_address || "-";
    const players = Array.isArray(detailedServer.players)
      ? detailedServer.players
      : [];
    const playersCount = players.length;
    const maxPlayers = detailedServer.max_players ?? detailedServer.maxPlayers ?? 0;
    const mods = Array.isArray(detailedServer.mods) ? detailedServer.mods : [];
    const percent = maxPlayers
      ? Math.min(Math.round((playersCount * 100) / maxPlayers), 100)
      : 0;
    const headless = yesNo(detailedServer.headless_server);
    const hasPassword = yesNo(detailedServer.has_password);
    const isSteam = app.build_mode === "steam" ? "Sim" : "Não";
    const name = detailedServer.name || "Servidor";

    document.getElementById("modalTitle").textContent = name;

    const tags = (Array.isArray(detailedServer.tags) ? detailedServer.tags : [])
      .filter(Boolean)
      .map((tag) => createBadge(String(tag), "badge bg-dark me-1 mb-1"));
    const playerBadges = players.map((player) =>
      createBadge(String(player), "badge bg-info"),
    );
    const modBadges = mods.slice(0, 50).map((mod) =>
      createBadge(`${mod.name || "Mod"} ${mod.version || ""}`.trim(), "badge bg-warning"),
    );
    const infoTiles = [
      ["Versão", app.game_version],
      ["Build", app.build_version],
      ["Modo", app.build_mode],
      ["Plataforma", app.platform],
      ["Endereço", address],
      ["Headless", headless],
      ["Senha", hasPassword],
      ["Steam", isSteam],
    ].map(([label, value]) => createInfoTile(label, value));

    const copyButton = createButton("Copiar endereço", "btn btn-primary w-100 mb-2", {
      id: "copyAddress",
      type: "button",
    });
    copyButton.prepend(
      createElement("i", "bi bi-copy me-1", null, { "aria-hidden": "true" }),
    );
    copyButton.addEventListener("click", async () => {
      const copied = await window.copyText(address);
      if (!copied) return;

      copyButton.textContent = "Copiado!";
      window.setTimeout(() => {
        copyButton.replaceChildren(
          createElement("i", "bi bi-copy me-1", null, { "aria-hidden": "true" }),
          document.createTextNode("Copiar endereço"),
        );
      }, 1500);
    });

    const connectButton = createButton("Conectar", "btn btn-success w-100", {
      id: "connectServer",
      type: "button",
    });
    connectButton.prepend(
      createElement("i", "bi bi-controller me-1", null, { "aria-hidden": "true" }),
    );
    connectButton.addEventListener("click", () => {
      if (!address || address === "-") return;

      window.open(`steam://connect/${address}`, "_blank");
      navigator.clipboard?.writeText(address).catch(() => {});
    });

    const mainColumn = createElement("div", "col-lg-8", null, {}, [
      createHeading(3, name, "mb-3"),
      createParagraph(detailedServer.description || "Sem descrição."),
      createElement("div", "mb-3", null, {}, tags),
      createElement("div", "progress mb-3", null, { "aria-label": "Ocupação de jogadores" }, [
        createElement("div", "progress-bar bg-success", `${playersCount}/${maxPlayers}`, {
          style: `width:${percent}%`,
          role: "progressbar",
          "aria-valuenow": percent,
          "aria-valuemin": 0,
          "aria-valuemax": 100,
        }),
      ]),
      createDetailSection(
        "Jogadores online",
        playerBadges.length
          ? playerBadges
          : [createElement("span", "text-muted", "Nenhum jogador online")],
      ),
      createDetailSection(
        `Mods (${mods.length})`,
        modBadges.length
          ? modBadges
          : [createElement("span", "text-muted", "Vanilla")],
      ),
      createElement("div", "row g-3", null, {}, infoTiles),
    ]);

    const statusCard = createElement("div", "glass p-4", null, {}, [
      createHeading(5, "Status"),
      createElement("hr"),
      createStatusLine("Jogadores", `${playersCount}/${maxPlayers}`),
      createStatusLine("Mods", String(mods.length)),
      createStatusLine("Headless", headless),
      createStatusLine("Senha", hasPassword),
      createStatusLine("Steam", isSteam),
      copyButton,
      connectButton,
    ]);
    const statusColumn = createElement("div", "col-lg-4", null, {}, [statusCard]);
    const modalContent = createElement("div", "container-fluid", null, {}, [
      createElement("div", "row", null, {}, [mainColumn, statusColumn]),
    ]);

    document.getElementById("modalBody").replaceChildren(modalContent);
    new bootstrap.Modal(document.getElementById("serverModal")).show();
  } catch (error) {
    console.error(error);
    window.alert(`Erro ao carregar servidor: ${error.message}`);
  }
}

window.showServer = showServer;
