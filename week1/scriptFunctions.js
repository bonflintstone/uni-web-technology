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

function addAccessibility() {
  document.getElementById('toggle-font').addEventListener('click', function(event) {
    event.preventDefault();

    bodyStyle = document.querySelector('body').style;

    if(bodyStyle.fontSize != '200%') {
      bodyStyle.fontSize = '200%'
    } else {
      bodyStyle.fontSize = '100%'
    }
  });
}

addAccessibility()
