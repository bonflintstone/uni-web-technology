addEventListeners = function() {
  var tableHeaders = document.querySelectorAll('#myTable thead th');

  for(header of tableHeaders) {
    header.addEventListener('click', function() {
      newClass = this.className == 'sort' ? 'reverse' : 'sort';
      [].map.call(tableHeaders, function(e) { e.className = '' });
      this.className = newClass;

      sortTable();
    }, false);
  }
}

var sortTable = function() {
  var rows = [].slice.call(document.querySelectorAll('#myTable tbody tr'));
  var tbody = document.querySelector('#myTable tbody');
  var sort = document.querySelector('#myTable th.sort, #myTable th.reverse');

  if(!sort) { return };

  var i = Array.from(sort.parentNode.children).indexOf(sort);

  rows = rows.sort(function(a, b) {
    return compare(sortData(a, i), sortData(b, i));
  });

  if(sort.className == 'reverse') {
    rows = rows.reverse();
  }

  rows.map(tbody.appendChild.bind(tbody));
}

var compare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

var sortData = function(node, index) {
  text = node.children[index].innerHTML;

  if(parseInt(text)) { return parseInt(text); }
  if(Date.parse(text)) { return Date.parse(text); }
  return text;
}

addEventListeners();
