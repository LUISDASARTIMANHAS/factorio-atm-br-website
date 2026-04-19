import { renderA, renderDiv, renderVideoIframeYoutube } from "../lib/render.js";
import { obterDados } from "./utils.mjs";

(() => {
  const youtubeContainer = document.querySelector(".videos-container");
  const FontLink = "https://www.youtube.com/@";
  const serverRecomendados = obterDados("api/recomendados")
  const recomendados = [
    {
      channelName: "promptdark",
      videoId: "vupx0LN66RI",
      label: "🔗 Acesse o canal do Prompt Dark",
    },
    {
      channelName: "FactorioBrasil",
      videoId: "-GyAfWIYcx0",
      label: "🔗 Acesse o canal do Factorio Brasil",
    },
    {
      channelName: "nytromancegames",
      videoId: "lIl3VtWp9C8?si=WKkKXl_uikp4bWc0",
      label: "🔗 Acesse o canal do NYTROMANCE GAMES",
    },
  ];

  recomendados.forEach((recomendado) => {
    let videoItem = renderDiv(youtubeContainer, "video-item col-12 col-sm-6 col-md-6 d-flex flex-column gap-2");
    renderA(
      videoItem,
      "channel-link",
      `${FontLink}${recomendado.channelName}`,
      recomendado.label
    );
    let divRatio = renderDiv(videoItem,"ratio ratio-16x9");
    renderVideoIframeYoutube(divRatio,"w-100", recomendado.videoId);
  });
  // <div class="video-item col-12 col-sm-6 col-md-4 d-flex flex-column gap-2">
  //         <a
  //           href="https://www.youtube.com/@asdasd"
  //           target="_blank"
  //           class="channel-link"
  //         >
  //           🔗 Acesse o canal do xasdas
  //         </a>
  //         <div class="ratio ratio-16x9">
  //           <iframe
  //            width="300"
  //            height="169"
  //            src="https://www.youtube.com/embed/id"
  //            frameborder="0"
  //            muted
  //            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //             allowfullscreen
  //           ></iframe>
  //        </div>
  //       </div>
})();
