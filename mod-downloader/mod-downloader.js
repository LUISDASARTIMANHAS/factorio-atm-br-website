import config from "../src/js/config.js";

export async function fetchInitialMods() {
	const res = await fetch(`${config.serverUrl}/mods`);
	return (await res.json()).data.results;
}

export async function fetchModByName(name) {
	const res = await fetch(`${config.serverUrl}/mods/${encodeURIComponent(name)}`);
	const data = await res.json();
	console.log(data);
	return data;
}
