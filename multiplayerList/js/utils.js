"use strict";

/**
 * Normaliza um servidor retornado pela API.
 *
 * @param {Object} server
 * @returns {Object}
 */
function normalizeServer(server) {
  const players = Array.isArray(server.players) ? server.players : [];

  const maxPlayers = Number(server.max_players) || 0;

  return {
    ...server,

    players,

    playerCount: players.length,

    maxPlayers,

    version: server.application_version?.game_version ?? "Desconhecida",

    description: server.description || "Sem descrição.",

    modCount: Number(server.mod_count) || 0,

    hasMods: Boolean(server.has_mods),

    hasPassword: Boolean(server.has_password),

    dedicated: Boolean(server.headless_server),

    tags: Array.isArray(server.tags) ? server.tags : [],
  };
}
