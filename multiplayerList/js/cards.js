/**
 * Renderização dos cards dos servidores.
 * @author Luis das Artimanhas
 */

import { createAlert } from "../components/base/alert.js";
import { createBadge } from "../components/base/badge.js";
import { createButton } from "../components/base/button.js";
import { createCard } from "../components/base/card.js";
import { createElement } from "../components/base/dom-utils.js";
import { createHeading } from "../components/base/heading.js";
import { createPaginationItem } from "../components/base/paginationItem.js";
import { createPaginationLink } from "../components/base/paginationLink.js";
import { createParagraph } from "../components/base/paragraph.js";

const serversContainer = document.getElementById("serversContainer");
const paginationContainer = document.getElementById("serversPagination");
const PAGE_SIZE = 12;
const MAX_VISIBLE_PLAYERS = 255;
let currentList = [];
let currentPage = 1;

function badge(text, color) {
  return createBadge(String(text), `badge bg-${color}`);
}

function playerPercent(server) {
  const max = server?.maxPlayers || 0;
  const current = server?.playerCount || 0;

  if (max <= 0) return 0;

  return Math.min(Math.round((current * 100) / max), 100);
}

function progressColor(value) {
  if (value < 40) return "bg-success";
  if (value < 80) return "bg-warning";
  return "bg-danger";
}

function createServerCard(server, index) {
  const players = Array.isArray(server.players) ? server.players : [];
  const tags = Array.isArray(server.tags) ? server.tags : [];
  const visiblePlayers = players.slice(0, MAX_VISIBLE_PLAYERS);
  const hiddenPlayers = players.length - visiblePlayers.length;
  const percent = playerPercent(server);
  const applicationVersion = server.application_version || {};

  const identity = createElement("div", "", null, {}, [
    createHeading(5, server.name || "Servidor", "server-title"),
    createElement(
      "div",
      "small-info",
      server.dedicated ? "Dedicated Server" : "Servidor",
    ),
  ]);
  const header = createElement("div", "d-flex justify-content-between", null, {}, [
    identity,
    createElement("i", "bi bi-hdd-network display-6 card-icon", null, {
      "aria-hidden": "true",
    }),
  ]);

  const serverBadges = [
    badge(`👥 ${server.playerCount || 0}/${server.maxPlayers || 0}`, "primary"),
    badge(
      server.hasMods ? `🧩 ${server.modCount || 0} Mods` : "Vanilla",
      server.hasMods ? "warning" : "success",
    ),
    badge(
      server.hasPassword ? "🔒 Senha" : "🔓 Livre",
      server.hasPassword ? "danger" : "success",
    ),
    badge(server.version || "Desconhecida", "secondary"),
  ];

  if (server.application_version) {
    serverBadges.push(
      createElement("div", "d-flex flex-wrap gap-1 mt-2", null, {}, [
        badge(`🎮 ${applicationVersion.game_version || "-"}`, "info"),
        badge(`🔧 ${applicationVersion.build_version || "-"}`, "secondary"),
        badge(`⚙️ ${applicationVersion.build_mode || "-"}`, "dark"),
        badge(`💻 ${applicationVersion.platform || "-"}`, "dark"),
      ]),
    );
  }

  const playerList = visiblePlayers.map((player) => badge(player, "info"));
  if (hiddenPlayers > 0) playerList.push(badge(`+${hiddenPlayers}`, "dark"));

  const playerContent = players.length
    ? createElement("div", "d-flex flex-wrap gap-1", null, {}, playerList)
    : createElement("div", "small text-muted", "Sem jogadores ativos");

  const detailsButton = createButton("", "btn btn-primary", {
    type: "button",
    "aria-label": `Ver detalhes de ${server.name || "servidor"}`,
  });
  detailsButton.append(
    createElement("i", "bi bi-search me-1", null, { "aria-hidden": "true" }),
    document.createTextNode("Ver detalhes"),
  );
  detailsButton.addEventListener("click", () => window.showServer(server));

  const card = createCard("glass p-4 h-100 server-card fade-in", [
    header,
    createElement("hr"),
    createParagraph(server.description || "Sem descrição.", "server-description"),
    createElement("div", "d-flex flex-wrap gap-2 mb-3", null, {}, serverBadges),
    createElement(
      "div",
      "progress mb-3",
      null,
      { "aria-label": "Ocupação de jogadores" },
      [
        createElement("div", `progress-bar ${progressColor(percent)}`, null, {
          style: `width:${percent}%`,
          role: "progressbar",
          "aria-valuenow": percent,
          "aria-valuemin": 0,
          "aria-valuemax": 100,
        }),
      ],
    ),
    createElement("div", "mb-3", null, {}, [
      createElement("div", "small text-muted mb-1", "Jogadores online"),
      playerContent,
    ]),
    createElement(
      "div",
      "d-flex flex-wrap gap-2 mb-4",
      null,
      {},
      tags.map((tag) => badge(tag, "dark")),
    ),
    createElement("div", "text-end", null, {}, [detailsButton]),
  ]);

  card.style.animationDelay = `${index * 0.05}s`;

  return card;
}

/**
 * Renderiza os cards dos servidores.
 * @param {Object[]} list
 * @returns {void}
 */
function renderPagination(totalPages) {
  paginationContainer.replaceChildren();

  if (totalPages <= 1) return;

  const pagination = createElement("ul", "pagination justify-content-center", null, {
    "aria-label": "Paginação dos servidores",
  });
  const previousLink = createPaginationLink("Anterior", () => {
    renderPage(currentPage - 1);
  });
  const previousItem = createPaginationItem(previousLink, currentPage === 1 ? "disabled" : "");

  if (currentPage === 1) {
    previousLink.setAttribute("aria-disabled", "true");
    previousLink.setAttribute("tabindex", "-1");
  }

  pagination.append(previousItem);

  for (let page = 1; page <= totalPages; page += 1) {
    const link = createPaginationLink(String(page), () => renderPage(page));
    const item = createPaginationItem(link, page === currentPage ? "active" : "");

    if (page === currentPage) link.setAttribute("aria-current", "page");

    pagination.append(item);
  }

  const nextLink = createPaginationLink("Próxima", () => {
    renderPage(currentPage + 1);
  });
  const nextItem = createPaginationItem(nextLink, currentPage === totalPages ? "disabled" : "");

  if (currentPage === totalPages) {
    nextLink.setAttribute("aria-disabled", "true");
    nextLink.setAttribute("tabindex", "-1");
  }

  pagination.append(nextItem);
  paginationContainer.append(pagination);
}

function renderPage(page) {
  const totalPages = Math.ceil(currentList.length / PAGE_SIZE);
  currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleServers = currentList.slice(start, start + PAGE_SIZE);

  serversContainer.replaceChildren();

  if (visibleServers.length === 0) {
    const emptyState = createAlert("Nenhum servidor encontrado.", "warning");
    serversContainer.append(createElement("div", "col-12", null, {}, [emptyState]));
    paginationContainer.replaceChildren();
    return;
  }

  visibleServers.forEach((server, index) => {
    serversContainer.append(
      createElement("div", "col-lg-4 col-md-6", null, {}, [
        createServerCard(server, index),
      ]),
    );
  });

  renderPagination(totalPages);
  serversContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCards(list) {
  currentList = Array.isArray(list) ? list : [];
  currentPage = 1;
  renderPage(currentPage);
}

window.renderCards = renderCards;
