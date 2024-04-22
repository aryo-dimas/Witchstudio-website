let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 60000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})





// JavaScript tambahan untuk lightbox
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const youtubeId = card.getAttribute("data-youtube-id");
    const lightboxId = card
      .querySelector(".card-image")
      .getAttribute("data-lightbox-id");

    card
      .querySelector(".card-image")
      .addEventListener("click", function (event) {
        event.stopPropagation();
        const iframeSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        document
          .getElementById(lightboxId)
          .querySelector("iframe")
          .setAttribute("src", iframeSrc);
        document.getElementById(lightboxId).style.display = "flex";
      });
  });

  const lightboxes = document.querySelectorAll(".lightbox");

  lightboxes.forEach((lightbox) => {
    lightbox.addEventListener("click", function (event) {
      if (event.target === this) {
        closeLightbox(lightbox.id);
      }
    });
  });
});

function closeLightbox(lightboxId) {
  document
    .getElementById(lightboxId)
    .querySelector("iframe")
    .setAttribute("src", "");
  document.getElementById(lightboxId).style.display = "none";
}

function openTab(link) {
  window.open(link, "_blank");
}
