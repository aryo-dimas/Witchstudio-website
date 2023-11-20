document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("background-video");
  const navbarNav = document.querySelector(".navbar-nav");

  document.querySelector("#hamburger-menu").onclick = () => {
    navbarNav.classList.toggle("active");
  };

  const hamburger = document.querySelector("#hamburger-menu");

  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove("active");
    }
  });

  const popcat = document.getElementById("popcat");
  const scoreDisplay = document.getElementById("score");
  const popSound = document.getElementById("popSound");
  const popUpContainer = document.getElementById("popUpContainer");
  const closePopUp = document.getElementById("closePopUp");
  const backgroundMusic = document.getElementById("background-music");
  const backgroundAlert = document.getElementById("background-alert");

  let score = 0;
  let isPlaying = true;
  let isSecondImage = false;

  function toggleImage() {
    if (isSecondImage) {
      popcat.src = "image/gambar-1.png";
      isSecondImage = false;
    } else {
      popcat.src = "image/gambar-2.png";
      isSecondImage = true;
    }
  }

  popcat.addEventListener("click", () => {
    if (isPlaying) {
      score++;
      scoreDisplay.textContent = score;

      toggleImage();
      setTimeout(toggleImage, 100);
    }

    // Memutar suara ketika Popcat diklik
    popSound.play();

    // Tampilkan popup setelah 10 klik dengan animasi
    if (score === 10) {
      popUpContainer.style.display = "block";
      backgroundAlert.play();

      // Tambahkan kelas "show" setelah sedikit waktu untuk memberi efek animasi
      setTimeout(() => {
        popUpContainer.classList.add("show");
      }, 50);
    }

    // Periksa apakah skor mencapai 20
    if (score >= 20 && !videoElement.hasAttribute("data-played")) {
      videoElement.src = "webem/polish_cow.webm"; // Ganti dengan path ke video baru

      // Putar lagu baru ketika latar belakang berganti
      backgroundMusic.play();

      videoElement.setAttribute("data-played", "true");
    }
  });

  // Tambahkan event listener untuk menutup popup dengan animasi
  closePopUp.addEventListener("click", function (event) {
    popUpContainer.classList.remove("show");

    setTimeout(() => {
      popUpContainer.style.display = "none";
    }, 500);
  });

  // Tambahkan event listener untuk menutup popup saat mengklik di luar popup
  popUpContainer.addEventListener("click", function (event) {
    if (event.target === popUpContainer) {
      popUpContainer.classList.remove("show");

      // Hapus kelas "show" setelah sedikit waktu untuk memberi efek animasi
      setTimeout(() => {
        popUpContainer.style.display = "none";
      }, 500);
    }
  });

  // Scroll Slide bar
  const slider = document.querySelector(".card-slider");
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationId;

  // Tentukan indeks awal slider (misalnya, indeks ke-5555)
  const startIndex = 5555;
  const initialTranslate = -startIndex * 100;

  // Inisialisasi posisi awal
  currentTranslate = initialTranslate;
  slider.style.transform = `translateX(${initialTranslate}%)`;

  // Event Listeners
  slider.addEventListener("mousedown", startDragging);
  slider.addEventListener("touchstart", startDragging);
  slider.addEventListener("mouseup", endDragging);
  slider.addEventListener("touchend", endDragging);
  slider.addEventListener("mouseleave", endDragging);
  slider.addEventListener("mousemove", drag);
  slider.addEventListener("touchmove", drag);

  function startDragging(e) {
    if (e.type === "touchstart") {
      startPosition = e.touches[0].clientX;
    } else {
      startPosition = e.clientX;
    }
    isDragging = true;
    animationId = requestAnimationFrame(animation);
    slider.style.transition = "none";
  }

  function endDragging() {
    isDragging = false;
    cancelAnimationFrame(animationId);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentTranslate !== 0) {
      // Swipe to the left
      currentTranslate += 100;
    } else if (
      movedBy > 100 &&
      currentTranslate !== -slider.offsetWidth * (slider.children.length - 1)
    ) {
      // Swipe to the right
      currentTranslate -= 100;
    }

    slider.style.transform = `translateX(${currentTranslate}%)`;
    slider.style.transition = "transform 0.5s ease";
  }

  function drag(e) {
    if (isDragging) {
      let currentPosition;
      if (e.type === "touchmove") {
        currentPosition = e.touches[0].clientX;
      } else {
        currentPosition = e.clientX;
      }
      const diff = currentPosition - startPosition;
      currentTranslate = prevTranslate + (diff / slider.offsetWidth) * 100;
    }
  }

  function animation() {
    if (isDragging) {
      requestAnimationFrame(animation);
    }
    slider.style.transform = `translateX(${currentTranslate}%)`;
  }
});
