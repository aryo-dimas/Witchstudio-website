// Kelas aktif jadi ada
const navbarNav = document.querySelector('.navbar-nav');

//kectika dokumen di klik
document.querySelector('#hamburger-menu').onclick = () =>{
    navbarNav.classList.toggle('active');
};

//pas diklik di luar dia hilang
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click' , function(e){
    if(!hamburger.contains(e.target)&& !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const popcat = document.getElementById("popcat");
  const scoreDisplay = document.getElementById("score");
  const popSound = document.getElementById("popSound");

  let score = 0;
  let isPlaying = true;
  let isSecondImage = false;

  function toggleImage() {
    if (isSecondImage) {
      popcat.src = "image/gambar-1.png"; // Ganti dengan path gambar pertama
      isSecondImage = false;
    } else {
      popcat.src = "image/gambar-2.png"; // Ganti dengan path gambar kedua
      isSecondImage = true;
    }
  }

  popcat.addEventListener("click", () => {
    if (isPlaying) {
      score++;
      scoreDisplay.textContent = score;

      toggleImage(); // Ganti gambar saat diklik
      setTimeout(toggleImage, 100); // Ganti kembali setelah setengah detik
    }
  });
});
// Menambahkan event listener untuk klik pada Popcat
popcat.addEventListener("click", () => {
    // Memutar suara ketika Popcat diklik
    popSound.play();
});
