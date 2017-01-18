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
          tdName = document.createElement('td');
          textName = document.createTextNode(item.name);
          tdName.appendChild(textName);

          tdCategory = document.createElement('td');
          textCategory = document.createTextNode(item.category);
          tdCategory.appendChild(textCategory);

          tdAmount = document.createElement('td');
          textAmount = document.createTextNode(item.amount);
          tdAmount.appendChild(textAmount);

          tdLocation = document.createElement('td');
          textLocation = document.createTextNode(item.location);
          tdLocation.appendChild(textLocation);

          tdDate = document.createElement('td');
          textDate = document.createTextNode(item.date);
          tdDate.appendChild(textDate);

          tr = document.createElement('tr')
          tr.appendChild(tdName);
          tr.appendChild(tdCategory);
          tr.appendChild(tdAmount);
          tr.appendChild(tdLocation);
          tr.appendChild(tdDate);

          table = document.querySelector('#myTable tbody');
          table.appendChild(tr);
        }
    }
  }

  request.open("GET", "http://wt.ops.few.vu.nl/api/bea6ee38", true);
  request.send(null);
};

loadTable();
