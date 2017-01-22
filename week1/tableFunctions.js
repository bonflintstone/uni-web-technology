//This function sets a GET request to a specific URL in order the reset the database
//The functionality is implented through a reset button

document.getElementById("reset-button").addEventListener('click', function(event) {
  event.preventDefault();

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      document.querySelector('#myTable tbody').innerHTML = "";
      loadTable();
    }
  }
  request.open("GET", "http://wt.ops.few.vu.nl/api/bea6ee38/reset", true);
  request.send(null);
});

document.getElementById("add-form").addEventListener('submit', function(event) {
  event.preventDefault();

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 201) {
      loadTable(JSON.parse(request.responseText).URI);
    }
  }

  var data = [].reduce.call(this.querySelectorAll('input, select'), function(a, c) {
    a[c.name] = c.value; return a;
  }, {})

  request.open('post', 'http://wt.ops.few.vu.nl/api/bea6ee38', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
});

var tdWithTextNode = function(textNode) {
  return document.createElement('td').appendChild(textNode).parentNode;
}

var addToTable = function(rowData) {
  tr = document.createElement('tr');

  ['name', 'category', 'amount', 'location', 'date']
    .map(function(attr) { return rowData[attr] })
    .map(document.createTextNode.bind(document))
    .map(tdWithTextNode)
    .map(tr.appendChild.bind(tr));

  document.querySelector('#myTable tbody').appendChild(tr);

  sortTable();
  if(typeof chart !== "undefined") { redrawChart(); }
}

var loadTable = function(url) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      response = JSON.parse(request.responseText);

      (Array.isArray(response) ? response : [response]).map(addToTable);
    }
  }

  request.open("GET", url || "http://wt.ops.few.vu.nl/api/bea6ee38", true);
  request.send(null);
};

loadTable();
