const pointButton = document.querySelector(".point-button");
const pointDisplay = document.getElementById("points");
const buttons = document.querySelectorAll(".button");
const buttonContainer = document.querySelector(".button-container");
const button01 = document.getElementById("button1");
const sketchfabEmbedWrapper = document.querySelector(
  ".sketchfab-embed-wrapper"
);

button01.addEventListener("click", function () {
  button01.classList.toggle("green");
});

let challengeCompleted = false; // Global variable to track if challenge is completed

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (!challengeCompleted) {
      // Challenge not completed, disable button and return
      button.classList.add("locked");
      return;
    } else {
      button.classList.add("unlocked");
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

let points = 0;
let selectedModel = "";

// Generate a random number between 1 and 5
function generatePoints() {
  return Math.floor(Math.random() * 5) + 1;
}

// Update the point display
function updatePoints() {
  points += generatePoints();
  pointDisplay.textContent = points;
}

// Update the button state
function updateButton(button) {
  const id = button.getAttribute("data-model-id");
  if (
    id === selectedModel &&
    points >= button.getAttribute("data-point-threshold")
  ) {
    button.classList.add("green");
    button.classList.remove("locked");
  }
}

// Reset the button states
function resetButtons() {
  buttons.forEach((button) => {
    if (button.getAttribute("data-model-id") === selectedModel) {
      button.classList.remove("green");
      button.classList.remove("locked");
      button.disabled = false;
    }
  });
}

// Handle button clicks
function handleButtonClick(event) {
  const button = event.target;
  const id = button.getAttribute("data-model-id");
  const pointThreshold = button.getAttribute("data-point-threshold");

  // Check if the button is unlocked and has enough points
  if (!button.classList.contains("locked") && points >= pointThreshold) {
    selectedModel = id;
    resetButtons();
    if (id === "modal-1-button") {
      button.classList.add("green");
    } else {
      button.classList.add("red");
    }
    button.disabled = true;
  }
}

// Handle point button click
function handlePointButtonClick() {
  updatePoints();
  resetButtons();
  buttons.forEach((button) => updateButton(button));
  updatePoints();
}

// Add event listeners
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
pointButton.addEventListener("click", handlePointButtonClick);
