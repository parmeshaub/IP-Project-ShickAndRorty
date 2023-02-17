const buttonContainer = document.querySelector(".button-container");
const buttons = document.querySelectorAll(".button");
const sketchfabEmbedWrapper = document.querySelector(
  ".sketchfab-embed-wrapper"
);

let challengeCompleted = false; // Global variable to track if challenge is completed

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (!challengeCompleted) {
      // Challenge not completed, disable button and return
      button.classList.add("locked");
      return;
    }

    // Set the iframe source to the new model
    const modelId = button.getAttribute("data-model-id");
    sketchfabEmbedWrapper.innerHTML = `
      <iframe
        title="Sketchfab Model"
        frameborder="0"
        allow="autoplay; fullscreen; vr"
        src="https://sketchfab.com/models/${modelId}/embed?ui_stop=1&ui_help=0&ui_annotations=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_settings=0&ui_snapshots=0&ui_stats=0&ui_theme=dark&ui_watermark=0&transparent=1"
        allowfullscreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        style="width: 100%; height: 100%"
      ></iframe>
    `;
  });
});
