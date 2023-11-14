document.addEventListener("DOMContentLoaded", function () {
  const handle = document.getElementById("handle");
  const joystick = document.getElementById("joystick");
  const reelsList = document.querySelectorAll(".slots > .reel");
  const debugEl = document.getElementById("debug");

  let isDragging = false;
  let deltaY = 0;

  handle.addEventListener("mousedown", startDragging);
  window.addEventListener("mouseup", stopDragging);
  window.addEventListener("mousemove", handleMouseMove);

  function startDragging(e) {
    isDragging = true;
    deltaY = 0;
    joystick.classList.add("active");
    rollAll();
  }

  function stopDragging() {
    if (isDragging) {
      isDragging = false;
      joystick.classList.remove("active");
      handle.style.transform = "translateY(0)";
    }
  }

  function handleMouseMove(e) {
    if (isDragging) {
      const rect = joystick.getBoundingClientRect();
      deltaY =
        Math.min(rect.height - 30, Math.max(-30, e.clientY - rect.top - 15)) /
        10;
      handle.style.transform = `translateY(${deltaY * 10}px)`;
    }
  }

  function rollAll() {
    debugEl.textContent = "rolling...";

    const rollPromises = [...reelsList].map((reel, i) => roll(reel, i));

    Promise.all(rollPromises).then((deltas) => {
      debugEl.textContent = "stopped";
      reelsList.forEach((reel) => {
        reel.style.transition = "none";
      });
    });
  }
});
