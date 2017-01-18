addEventListeners = function() {
  var tableHeaders = document.querySelectorAll('#product-table thead th');

  for (header of tableHeaders) {
    header.addEventListener('click', function() {
      var index = Array.from(this.parentNode.children).indexOf(this);
      sortTableBy(index);
    }, false);
  }
}

sortTableBy = function(index) {
  var rows = Array.prototype.slice.call(document.querySelectorAll('#product-table tbody tr'));
  var tbody = document.querySelector('#product-table tbody');

  rows = rows.sort(function(a, b) {
    aText = a.children[index].innerHTML;
    bText = b.children[index].innerHTML;

    return aText.localeCompare(bText);
  });

  for (row of rows) {
    tbody.appendChild(row);
  }
}

addEventListeners();
