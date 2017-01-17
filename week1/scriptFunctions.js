function changeBackgroundColor() {
  document.body.style.backgroundColor = "red";
}

function preventDefaultWebsite() {
  document.addEventListener("click", function(event) {
    event.preventDefault();
  });
}
