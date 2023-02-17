let text = document.getElementById("title");
let gateLeft = document.getElementById("gate_left");
let gateRight = document.getElementById("gate_right");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  text.style.marginTop = value * 1 + "px";
  gateLeft.style.left = value * 0.5 + "px";
  gateRight.style.left = value * -0.5 + "px";
});
