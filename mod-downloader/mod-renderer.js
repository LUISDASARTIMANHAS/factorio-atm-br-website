import { getLatestRelease } from "./utils.js";

import { createElement } from "./components/dom-utils.js";
import { createModImage } from "./components/mod-image.js";
import { createModHeader } from "./components/mod-header.js";
import { createModDescription } from "./components/mod-description.js";
import { createMetadata } from "./components/mod-metadata.js";
import { createDownloadButton } from "./components/mod-download-button.js";
import { createModReleases } from "./components/releases.js";

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
