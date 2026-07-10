
import { getLatestRelease } from "../../utils.js";
import { createElement } from "../base/dom-utils.js";
import { createModDescription } from "./mod-description.js";
import { createDownloadButton } from "./mod-download-button.js";
import { createModHeader } from "./mod-header.js";
import { createModImage } from "./mod-image.js";
import { createMetadata } from "./mod-metadata.js";
import { createModReleases } from "./release/releases.js";

/**
 * Renderiza um card completo de mod.
 *
 * @param {Object} mod
 * @returns {HTMLElement|null}
 */
export function createModCardElement(mod) {
  const release = getLatestRelease(mod);

  if (!release) {
    return null;
  }

  const col = createElement("div", "col-md-4 mb-4");

  const card = createElement("div", "card mod-card shadow-sm");

  const body = createElement("div", "card-body d-flex flex-column");

  card.appendChild(createModImage(mod));

  body.appendChild(createModHeader(mod));

  body.appendChild(createModDescription(mod));

  body.appendChild(createMetadata(mod, release));

  if (mod.detailsLoaded) {
    body.appendChild(createModReleases(mod));
  }

  body.appendChild(createDownloadButton(mod));

  card.appendChild(body);

  col.appendChild(card);

  return col;
}
