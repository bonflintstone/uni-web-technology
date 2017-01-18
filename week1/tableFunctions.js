document.getElementById("reset-button").addEventListener('click', function(event) {
  event.preventDefault();

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status != 200) {
      alert("Sorry this did not work");
    }
  }
  request.open("GET", "http://wt.ops.few.vu.nl/api/bea6ee38/reset", true);
  request.send(null);
});

loadTable = function(){
  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      items = JSON.parse(request.responseText);
        for(item of items){
          for (var key in item) {
            alert(key);
          }


        }

      console.log(items);
    }
  }

  request.open("GET", "http://wt.ops.few.vu.nl/api/bea6ee38", true);
  request.send(null);
};

loadTable();
