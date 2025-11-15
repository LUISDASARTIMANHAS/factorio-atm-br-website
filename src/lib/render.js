// PUBLIC PROJECT FOR AUTOMATED RENDERIZATIONS
// POWERED BY LUIS DAS ARTIMANHAS
// Clean Code + JSDoc + Logging automático
// V 0.0.2

/**
 * Log padronizado para eventos de renderização.
 * @param {string} componente
 * @param {string} detalhe
 * @return {void}
 */
function logRender(componente, detalhe) {
  console.log(
    `%c[SISTEMA RENDER]: ${componente} → ${detalhe}`,
    "color:#4FC3F7; font-weight:bold;"
  );
}

export function renderTableElement(tableTrLine, innerHTML) {
  var td = document.createElement("td");

  td.innerHTML = innerHTML;
  tableTrLine.appendChild(td);
  return td;
}

export function renderTableLine(tabela) {
  var tr = document.createElement("tr");

  tabela.appendChild(tr);
  return tr;
}


/**
 * Renderiza um arquivo CSS no HEAD.
 * @param {HTMLElement} element
 * @param {string} href
 * @return {HTMLLinkElement}
 */
export function renderLinkCss(element, href) {
  const link = document.createElement("link");

  link.setAttribute("href", href);
  link.setAttribute("rel", "stylesheet");

  element.appendChild(link);

  logRender("CSS", `Carregado: ${href}`);

  return link;
}

/**
 * Renderiza um iframe (janela)
 * @param {HTMLElement} element
 * @param {string} src
 * @param {boolean} muted
 * @param {string} allow
 * @param {number} frameborder
 * @param {boolean} allowfullscreen=true
 * @param {number} width=300
 * @param {number} heigh=169
 * @return {HTMLLinkElement}
 */

export function renderIframe(element,classe,src,allow,frameborder,allowfullscreen=true,width=300,heigh=169,) {
  const iframe = document.createElement("iframe");

  iframe.setAttribute("class",classe);
  iframe.setAttribute("src",src);
  iframe.setAttribute("frameborder",frameborder);
  iframe.setAttribute("allow", allow);
  if (allowfullscreen) {
    iframe.setAttribute("allowfullscreen", "");
  }
  iframe.setAttribute("width", width);
  iframe.setAttribute("height",heigh );

  element.appendChild(iframe);

  logRender("Iframe", `Carregado: ${src}`);

  return iframe;
}

export function renderVideoIframeYoutube(element,classe, channelID) {
  const defaultAllow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  const iframeYoutube = renderIframe(element,classe, `https://www.youtube.com/embed/${channelID}`,defaultAllow);

  // <iframe
//       width="300"
//       height="169"
//       src="https://www.youtube.com/embed/vupx0LN66RI"
//       frameborder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowfullscreen
//     ></iframe>
  logRender("IframeYoutube", `Carregado: ${channelID}`);

  return iframeYoutube;
}



/**
 * Renderiza um ícone <i>.
 * @param {HTMLElement} element
 * @param {string} classe
 * @return {HTMLElement}
 */
export function renderIcon(element, classe) {
  const i = document.createElement("i");

  i.setAttribute("class", classe);
  element.appendChild(i);

  logRender("Icon", `Classe: ${classe}`);

  return i;
}

/**
 * Renderiza um <script>.
 * @param {HTMLElement} element
 * @param {string} src
 * @param {boolean} isModule
 * @return {HTMLScriptElement}
 */
export function renderScript(element, src, isModule) {
  const script = document.createElement("script");

  if (isModule === true) {
    script.setAttribute("type", "module");
  }

  script.setAttribute("src", src);
  element.appendChild(script);

  logRender("Script", `Carregado: ${src}, type=${isModule ? "module" : "js"}`);

  return script;
}


/**
 * Renderiza uma Div
 * @param {HTMLElement} element
 * @param {string} classe
 * @return {HTMLElement}
 */
export function renderDiv(element, classe) {
  const div = document.createElement("div");

  div.setAttribute("class", classe);
  element.appendChild(div);

  logRender("Div", `Classe: ${classe}`);

  return div;
}

/**
 * Renderiza uma fonte (tag <font>, embora obsoleta).
 * @param {HTMLElement} element
 * @param {string} classe
 * @return {HTMLElement}
 */
export function renderFont(element, classe) {
  const font = document.createElement("font");

  font.setAttribute("class", classe);
  element.appendChild(font);

  logRender("Font", `Classe: ${classe}`);

  return font;
}

/**
 * Renderiza um link <a>.
 * @param {HTMLElement} element
 * @param {string} classe
 * @param {string} href
 * @param {string} text
 * @param {string} target
 * @return {HTMLAnchorElement}
 */
export function renderA(element, classe, href, text, target = "_self") {
  const a = document.createElement("a");

  a.setAttribute("class", classe);
  a.setAttribute("href", href);
  a.setAttribute("target", target);
  a.textContent = text;

  element.appendChild(a);

  logRender("A", `Texto="${text}" → ${href}`);

  return a;
}

/**
 * Renderiza um botão.
 * @param {HTMLElement} element
 * @param {string} classe
 * @param {string} text
 * @param {Function} onclick
 * @return {HTMLButtonElement}
 */
export function renderButton(element, classe, text, onclick) {
  const button = document.createElement("button");

  if (onclick) {
    button.addEventListener("click", onclick);
  }

  button.setAttribute("class", classe);
  button.textContent = text;

  element.appendChild(button);

  logRender("Button", `Texto="${text}", Classe="${classe}"`);

  return button;
}

/**
 * Renderiza um <span>.
 * @param {HTMLElement} element
 * @param {string} classe
 * @param {string} text
 * @return {HTMLSpanElement}
 */
export function renderSpan(element, classe, text) {
  const span = document.createElement("span");

  span.setAttribute("class", classe);
  span.textContent = text;

  element.appendChild(span);

  logRender("Span", `Texto="${text}"`);

  return span;
}

/**
 * Renderiza um <h2>.
 * @param {HTMLElement} element
 * @param {string} classe
 * @param {string} nome
 * @return {HTMLHeadingElement}
 */
export function renderH2(element, classe, nome) {
  const h2 = document.createElement("h2");

  h2.setAttribute("class", classe);
  h2.textContent = nome;

  element.appendChild(h2);

  logRender("H2", `Título="${nome}"`);

  return h2;
}

/**
 * Renderiza um <img>.
 * @param {HTMLElement} picture
 * @param {string} src
 * @param {string} alt
 * @return {HTMLImageElement}
 */
export function renderIMG(picture, src, alt) {
  const img = document.createElement("img");

  img.setAttribute("src", src);
  img.setAttribute("alt", alt);

  picture.appendChild(img);

  logRender("IMG", `src="${src}" alt="${alt}"`);

  return img;
}

/**
 * Renderiza um <source>.
 * @param {HTMLElement} picture
 * @param {string} srcSet
 * @param {number} minWidth
 * @return {HTMLSourceElement}
 */
export function renderSource(picture, srcSet, minWidth) {
  const source = document.createElement("source");

  source.setAttribute("srcset", srcSet);
  source.setAttribute("media", `(min-width: ${minWidth}px)`);

  picture.appendChild(source);

  logRender("Source", `srcset="${srcSet}" (min-width: ${minWidth}px)`);

  return source;
}

/**
 * Renderiza um <picture> com source + img.
 * @param {HTMLElement} element
 * @param {string} srcSet
 * @param {string} nome
 * @return {HTMLElement}
 */
export function renderPicture(element, srcSet, nome) {
  const picture = document.createElement("picture");

  renderSource(picture, srcSet, 768);
  renderIMG(picture, srcSet, nome);

  element.appendChild(picture);

  logRender("Picture", `Imagem="${nome}" src="${srcSet}"`);

  return picture;
}

/**
 * Renderiza link para WhatsApp automaticamente.
 * @param {HTMLElement} element
 * @param {string} classe
 * @param {string} number
 * @param {string} textWA
 * @param {string} text
 */
export function renderAWa(element, classe, number, textWA, text) {
  const href = `https://wa.me/${number}?text=${textWA}`;
  const classeWA = `fa-whatsapp whatsapp ${classe}`;

  renderA(element, classeWA, href, text, "_blank");

  logRender("WhatsApp Link", `Numero=${number}`);
}