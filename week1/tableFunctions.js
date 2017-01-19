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
    if(request.readyState != 4 || request.status != 200){
      return;
    }

    table = document.querySelector('#myTable tbody') ;

    for(item of JSON.parse(request.responseText)){
      tr = document.createElement('tr');

      ['name', 'category', 'amount', 'location', 'date'].map(function(attr){
        text = document.createTextNode(item[attr]);
        td = document.createElement('td');
        td.appendChild(text);
        tr.appendChild(td);
      });

      table.appendChild(tr);
    }
  }

  request.open("GET", "http://wt.ops.few.vu.nl/api/bea6ee38", true);
  request.send(null);
};

loadTable();
