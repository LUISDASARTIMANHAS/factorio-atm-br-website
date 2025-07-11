import config from "../src/js/config.js";

export async function fetchInitialMods() {
	const res = await fetch(`${config.serverUrl}/mods`);
	const data = await res.json();
	console.log("Mods retornados: ",data.results);
	return data.results;
}

export async function fetchModByName(name) {
	const res = await fetch(`${config.serverUrl}/mods/${encodeURIComponent(name)}`);
	const data = await res.json();
	console.log(data);
	return data;
}
