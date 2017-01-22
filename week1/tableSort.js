// adding an event listener to every th in our table to sort them on click
addEventListeners = function() {
  var tableHeaders = document.querySelectorAll('#myTable thead th');

  for(header of tableHeaders) {
    header.addEventListener('click', function() {
      // When an element is clicked it will be given a class of reverse if
      // it already was sorted by or sort if not
      newClass = this.className == 'sort' ? 'reverse' : 'sort';
      [].map.call(tableHeaders, function(e) { e.className = '' });
      this.className = newClass;

      // then the table will be sorted
      sortTable();
    }, false);
  }
}

// Getting all the rows from the table, sorting them by the selected
// column and readding them to the table in the new order
var sortTable = function() {
  // initializing the impportant dom elements
  var rows = [].slice.call(document.querySelectorAll('#myTable tbody tr'));
  var tbody = document.querySelector('#myTable tbody');
  // the th in the column which is to be sorted has the class of either sort or reverse
  var sort = document.querySelector('#myTable th.sort, #myTable th.reverse');

  // if there is no column selected, we need not sort
  if(!sort) { return };

  // column index
  var i = Array.from(sort.parentNode.children).indexOf(sort);

  // sorting stuff by the sortData of the element
  rows = rows.sort(function(a, b) {
    return compare(sortData(a, i), sortData(b, i));
  });

  // Reverse the sorting if it should be reversed
  if(sort.className == 'reverse') {
    rows = rows.reverse();
  }

  // readd the rows
  rows.map(tbody.appendChild.bind(tbody));
}

// comparing the elements with the < and > operator, returning
// 1 if a is bigger than b
// 0 if a and b are equal
// -1 if b is bigger than a
var compare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

// Converting the raw strings from the table the actual objects
// they represent. Works for dates and ints
var sortData = function(node, index) {
  text = node.children[index].innerHTML;

  if(Date.parse(text)) { return Date.parse(text); }
  if(parseInt(text)) { return parseInt(text); }
  return text;
}

addEventListeners();
