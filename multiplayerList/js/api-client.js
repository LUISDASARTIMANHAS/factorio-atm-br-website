const HEADERS_API_URL = "https://pingobras-sg.onrender.com/headers";

/**
 * Busca e normaliza os dados de conexão fornecidos pelo endpoint /headers.
 *
 * @returns {Promise<{ip: string, country: string, city: string}>}
 */
export async function fetchClientLocation() {
  const response = await fetch(HEADERS_API_URL, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Não foi possível consultar /headers.");
  }

  const headers = await response.json();
  const countryCode = headers["cf-ipcountry"];
  let country = countryCode || "Indisponível";

  if (countryCode && countryCode !== "XX") {
    try {
      country =
        new Intl.DisplayNames(["pt-BR"], { type: "region" }).of(countryCode) ||
        countryCode;
    } catch {
      country = countryCode;
    }
  }

  return {
    ip:
      headers["cf-connecting-ip"] ||
      headers["true-client-ip"] ||
      headers["x-forwarded-for"]?.split(",")[0].trim() ||
      "Indisponível",
    country,
    city:
      headers["cf-ipcity"] ||
      headers["x-vercel-ip-city"] ||
      headers.city ||
      "Não informada pela API",
  };
}