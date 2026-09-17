import { createElement } from "../base/dom-utils.js";
import { createModDescription } from "./mod-description.js";
import { createDownloadButton } from "./mod-download-button.js";
import { createModImage } from "./mod-image.js";
import { createMetadata } from "./mod-metadata.js";
import { createModReleases } from "./release/releases.js";
import { getLatestRelease } from "../../utils.js";

/**
 * Cria a página completa de detalhes de um mod.
 *
 * @param {Object} mod
 * @returns {HTMLElement}
 */
export function createModDetailsPage(mod) {
  const release = getLatestRelease(mod);
  if (!release) {
    throw new Error("Este mod não possui versões disponíveis.");
  }

  const title = mod.title || mod.name || "Mod sem título";
  const page = createElement("article", "mod-details-page");

  const hero = createElement("header", "mod-details-hero");
  const heroImage = createModImage(mod);
  heroImage.className = "mod-details-image";

  const heroContent = createElement("div", "mod-details-hero-content");
  heroContent.append(
    createElement("p", "mod-details-eyebrow", "FACTORIO MOD"),
    createElement("h1", "mod-details-title", title),
    createElement("p", "mod-details-slug", mod.name || ""),
    createModDescription(mod),
    createDownloadButton(mod),
  );

  hero.append(heroImage, heroContent);

  const overview = createElement("section", "mod-details-overview", null, {
    "aria-labelledby": "mod-overview-title",
  });
  const overviewTitle = createElement("h2", "section-title", "Informações do mod");
  overviewTitle.id = "mod-overview-title";
  overview.append(overviewTitle, createMetadata(mod, release));

  const releases = createElement("section", "mod-details-releases", null, {
    "aria-labelledby": "mod-releases-title",
  });
  const releasesTitle = createElement("h2", "section-title", "Todas as versões");
  releasesTitle.id = "mod-releases-title";
  releases.append(releasesTitle, createModReleases(mod));

  page.append(hero, overview, releases);
  return page;
}
