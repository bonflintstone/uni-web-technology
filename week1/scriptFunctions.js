function changeBackgroundColor() {
  document.body.style.backgroundColor = "red";
}

function preventDefaults() {
  document.getElementById('prevent-default').addEventListener("click", function(event) {
    event.preventDefault();
  });

  $('#prevent-default-query').click(function(event) {
    event.preventDefault();
  });
}

preventDefaults();
