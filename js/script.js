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
});



document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
