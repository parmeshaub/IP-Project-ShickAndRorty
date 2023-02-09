let Inventory_Array = [];
window.onload = function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  let timerX = 10;
  let timerY = 30;
  let time = 30;
  let timerId;
  let totalboxes = 0;
  let gottenboxes = 0;

  let playArea = {
    x: (canvas.width - 500) / 2,
    y: (canvas.height - 500) / 2,
    width: 500,
    height: 500,
  };

  let boxes = [];
  const padding = 35;

  let camera = {
    x: playArea.x,
    y: playArea.y,
    scale: 2,
    targetX: playArea.x,
    targetY: playArea.y,
  };

  for (let i = 0; i < Evidence_Key.length; i++) {
    boxes.push({
      x: Math.random() * (playArea.width - padding * 2) + playArea.x + padding,
      y: Math.random() * (playArea.height - padding * 2) + playArea.y + padding,
      width: 25,
      height: 25,
      text: Evidence_Key[i],
      color: "red",
    });
    totalboxes += 1;
  }

  for (let i = 0; i < Evidence_ThrowOff.length; i++) {
    boxes.push({
      x: Math.random() * (playArea.width - padding * 2) + playArea.x + padding,
      y: Math.random() * (playArea.height - padding * 2) + playArea.y + padding,
      width: 25,
      height: 25,
      text: Evidence_ThrowOff[i],
      color: "blue",
    });
    totalboxes += 1;
  }

  for (let i = 0; i < Evidence_Useless.length; i++) {
    boxes.push({
      x: Math.random() * (playArea.width - padding * 2) + playArea.x + padding,
      y: Math.random() * (playArea.height - padding * 2) + playArea.y + padding,
      width: 25,
      height: 25,
      text: Evidence_Useless[i],
      color: "gray",
    });
    totalboxes += 1;
  }

  draw();

  canvas.addEventListener("click", function (event) {
    const x = (event.clientX - canvas.offsetLeft - camera.x) / camera.scale;
    const y = (event.clientY - canvas.offsetTop - camera.y) / camera.scale;

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (
        x > box.x &&
        x < box.x + box.width &&
        y > box.y &&
        y < box.y + box.height
      ) {
        Inventory_Array.push(box.text);
        gottenboxes += 1;
        for (var i = 0, len = Inventory_Array.length; i < len; i++) {
          load(Inventory_Array[i]);
        }
        console.log(Inventory_Array);
        boxes.splice(i, 1);
        draw();
        break;
      }
    }
  });

  document.addEventListener("keydown", function (event) {
    switch (event.code) {
      case "ArrowLeft":
        camera.targetX += 20 / camera.scale;
        break;
      case "ArrowRight":
        camera.targetX -= 20 / camera.scale;
        break;
      case "ArrowUp":
        camera.targetY += 20 / camera.scale;
        break;
      case "ArrowDown":
        camera.targetY -= 20 / camera.scale;
        break;
    }
    requestAnimationFrame(animationFrame);
  });

  function animationFrame() {
    camera.x += (camera.targetX - camera.x) * 0.1;
    camera.y += (camera.targetY - camera.y) * 0.1;

    if (
      Math.abs(camera.x - camera.targetX) > 1 ||
      Math.abs(camera.y - camera.targetY) > 1
    ) {
      requestAnimationFrame(animationFrame);
    }

    draw();
  }

  function startTimer() {
    timerId = setInterval(() => {
      time--;
      if (time < 0) {
        clearInterval(timerId);
        alert("Time's up!");
        var canvas = document.getElementById("gameCanvas");
        canvas.style.display = "none";
      }
    }, 1000);
  }

  ctx.fillText(
    gottenboxes + "/" + totalboxes,
    playArea.x + playArea.width - 50,
    playArea.y + 20
  );

  function draw() {
    ctx.setTransform(camera.scale, 0, 0, camera.scale, camera.x, camera.y);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeRect(playArea.x, playArea.y, playArea.width, playArea.height);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillText(`Time remaining: ${time}`, timerX, timerY);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillText(
      gottenboxes + "/" + totalboxes,
      playArea.x + playArea.width - 50,
      playArea.y + 20
    );
    ctx.restore();

    ctx.font = "20px Arial";

    for (const box of boxes) {
      ctx.fillStyle = box.color;
      ctx.fillRect(box.x, box.y, box.width, box.height);
      ctx.fillStyle = "black";
      ctx.fillText(box.text, box.x, box.y + box.height / 2);
    }
  }
  startTimer();
};
