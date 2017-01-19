google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([['Name', 'Amount']].concat(
    Array.prototype.slice.call(document.querySelectorAll("tbody tr")).map(function(tr) {
      return [tr.children[0].innerHTML, parseInt(tr.children[2].innerHTML)];
    })
  ));

  var options = {
    legend: 'none',
    pieSliceText: 'label',
    sliceVisibilityThreshold: 0.05,
    backgroundColor: { fill: 'transparent' },
    titlePosition: 'none'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
