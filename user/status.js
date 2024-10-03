setInterval(reloadRenameSaves, 2000);
const IPServer = document.getElementById("Porta-Server");
const Logs = document.getElementById("output-area");


function reloadRenameSaves() {
  let saves = document.getElementById("saves").childNodes;
  saves.forEach((save) => renameSave(save));
}

function renameSave(save) {
  save.text = save.text.replaceAll("slot 1", "SERVER HUB");
  save.text = save.text.replaceAll("slot 2", "BOB, O PATO");
  save.text = save.text.replaceAll("slot 3", "GLADIADOR");
  save.text = save.text.replaceAll("slot 4", "LDA");
}