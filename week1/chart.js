google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

var options = {
  legend: 'none',
  pieSliceText: 'label',
  sliceVisibilityThreshold: 0.05,
  backgroundColor: { fill: 'transparent' },
  titlePosition: 'none'
};

function drawChart() {
  chart = new google.visualization.PieChart(document.getElementById('piechart'));
  redrawChart();
}

function redrawChart() {
  var data = google.visualization.arrayToDataTable([['Name', 'Amount']].concat(
    [].slice.call(document.querySelectorAll("#myTable tbody tr")).map(function(tr) {
      return [tr.children[0].innerHTML, parseInt(tr.children[2].innerHTML)];
    })
  ));

  chart.draw(data, options);
}
