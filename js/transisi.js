// transisi.js

function togglePopup() {
  var popup = document.getElementById("popupContainer");
  popup.style.display =
    popup.style.display === "none" || popup.style.display === ""
      ? "flex"
      : "none";
}

function closePopup() {
  document.getElementById("popupContainer").style.display = "none";
}
