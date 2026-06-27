/**
 * Modal de detalhes do servidor.
 * @author Luis das Artimanhas
 */

"use strict";

/**
 * Cria um badge.
 *
 * @param {string} text
 * @param {string} color
 * @returns {string}
 */
function createBadge(text, color = "primary") {
  return `
        <span class="badge bg-${color} me-1 mb-1">
            ${text}
        </span>
    `;
}

/**
 * Converte boolean para Sim/Não.
 *
 * @param {boolean} value
 * @returns {string}
 */
function yesNo(value) {
  return value ? "Sim" : "Não";
}

/**
 * Copia texto.
 *
 * @param {string} value
 */
async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Exibe detalhes do servidor.
 *
 * @param {string} serverId
 */
async function showServer(serverId) {
  try {
    const server = await fetchServerDetails(serverId);

    const modal = new bootstrap.Modal(document.getElementById("serverModal"));

    document.getElementById("modalTitle").innerHTML = `
            <i class="bi bi-hdd-network"></i>
            ${server.name}
            `;

    const tags = (server.tags || [])
      .map((tag) => createBadge(tag, "dark"))
      .join("");

    const version = server.application_version?.game_version || "-";

    const address = server.host_address || "-";

    const players = server.playerCount || 0;

    const maxPlayers = server.maxPlayers || 0;

    const percent = maxPlayers ? Math.round((players * 100) / maxPlayers) : 0;

    document.getElementById("modalBody").innerHTML = `
<div class="container-fluid">

<div class="row">

<div class="col-lg-8">

<h3 class="mb-3">

${server.name}

</h3>

<p>

${server.description || "Sem descrição."}

</p>

<div class="mb-4">

${tags}

</div>

<div class="progress mb-3">

<div
class="progress-bar bg-success"
style="width:${percent}%">

${players}/${maxPlayers}

</div>

</div>

<div class="row g-3">

<div class="col-md-6">

<div class="glass p-3">

<b>Versão</b>

<br>

${version}

</div>

</div>

<div class="col-md-6">

<div class="glass p-3">

<b>Endereço</b>

<br>

${address}

</div>

</div>

<div class="col-md-6">

<div class="glass p-3">

<b>Mods</b>

<br>

${server.modCount}

</div>

</div>

<div class="col-md-6">

<div class="glass p-3">

<b>Headless</b>

<br>

${yesNo(server.dedicated)}

</div>

</div>

<div class="col-md-6">

<div class="glass p-3">

<b>Senha</b>

<br>

${yesNo(server.hasPassword)}

</div>

</div>

<div class="col-md-6">

<div class="glass p-3">

<b>Steam</b>

<br>

${yesNo(server.steam_host)}

</div>

</div>

</div>

</div>

<div class="col-lg-4">

<div class="glass p-4">

<h5>

<i class="bi bi-activity"></i>

Status

</h5>

<hr>

<p>

<b>Jogadores</b>

<br>

${players}/${maxPlayers}

</p>

<p>

<b>Servidor dedicado</b>

<br>

${yesNo(server.dedicated)}

</p>

<p>

<b>Mods</b>

<br>

${server.modCount}

</p>

<p>

<b>Senha</b>

<br>

${yesNo(server.hasPassword)}

</p>

<button
id="copyAddress"
class="btn btn-primary w-100 mb-2">

<i class="bi bi-copy"></i>

Copiar endereço

</button>

<button
class="btn btn-success w-100">

<i class="bi bi-controller"></i>

Conectar

</button>

</div>

</div>

</div>

</div>

`;

    document.getElementById("copyAddress").onclick = () => {
      copyText(address);
    };

    modal.show();
  } catch (err) {
    console.error(err);

    alert(err.message);
  }
}
