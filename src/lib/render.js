// PUBLIC PROJECT FOR AUTOMATED RENDERIZATIONS
// POWERED BY LUIS DAS ARTIMANHAS
// lib in
// https://github.com/LUISDASARTIMANHAS/PINGOBRAS/blob/main/src/js/render.js
// funcoes basicas de renderização

export function renderLinkCss(element, href) {
  var link = document.createElement("link");

  link.setAttribute("href", href);
  link.setAttribute("rel", "stylesheet");
  element.appendChild(link);
  return link;
}

export function renderIcon(element, classe) {
  var i = document.createElement("i");

  i.setAttribute("class", classe);
  element.appendChild(i);
  return i;
}

export function renderScript(element, src, isModule) {
  var script = document.createElement("script");

  if (isModule || isModule == true) {
    script.setAttribute("type", "module");
  }
  script.setAttribute("src", src);
  element.appendChild(script);
  return script;
}

export function renderFont(element, classe) {
  var font = document.createElement("font");

  i.setAttribute("class", classe);
  element.appendChild(font);
  return i;
}

export function renderA(element, classe, href, text, target) {
  var a = document.createElement("a");
  // configuracoes do span Categoria
  a.setAttribute("class", classe);
  a.setAttribute("href", href);
  a.setAttribute("target", target);
  a.textContent = text;
  element.appendChild(a);
}

export function renderButton(element, classe, text,onclick) {
  var button = document.createElement("button");
  // configuracoes do span Categoria

  if (onclick) {
    button.addEventListener("click", onclick);
  }
  button.setAttribute("class", classe);
  button.textContent = text;
  element.appendChild(button);
}

export function renderSpan(element, classe, text) {
  var span = document.createElement("span");
  // configuracoes do span Categoria
  span.setAttribute("class", classe);
  span.textContent = text;
  element.appendChild(span);
}

export function renderH2(element, classe, nome) {
  var h2 = document.createElement("h2");
  // configuracoes do titulo h2
  h2.setAttribute("class", classe);
  h2.textContent = nome;
  element.appendChild(h2);
  return h2;
}

export function renderIMG(picture, src, alt) {
  var img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  picture.appendChild(img);
  return img;
}

export function renderSource(picture, srcSet, minWidth) {
  // configuracoes de source
  var source = document.createElement("source");
  source.setAttribute("srcset", srcSet);
  source.setAttribute("media", `(min-width: ${minWidth}px)`);
  picture.appendChild(source);
  return source;
}

export function renderPicture(element, srcSet, nome) {
  var picture = document.createElement("picture");
  renderSource(picture, srcSet, 768);
  renderIMG(picture, srcSet, nome);
  element.appendChild(picture);
  return picture;
}

export function renderAWa(element, classe, number, textWA, text) {
  const href = `https://wa.me/${number}?text=${textWA}`;
  const classeWA = `fa-whatsapp whatsapp ${classe}`;
  renderA(element, classeWA, href, text, "_blank");
}