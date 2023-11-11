document.addEventListener("DOMContentLoaded", () => {
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

      // Tambahkan kelas "show" setelah sedikit waktu untuk memberi efek animasi
      setTimeout(() => {
        popUpContainer.classList.add("show");
      }, 50);
    }
  });

  // Tambahkan event listener untuk menutup popup dengan animasi
  closePopUp.addEventListener("click", function (event) {
    event.stopPropagation();
    popUpContainer.classList.remove("show");

    // Hapus kelas "show" setelah sedikit waktu untuk memberi efek animasi
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
