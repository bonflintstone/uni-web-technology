// loading the google charts
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

// table options to be used on draw
var options = {
  legend: 'none',
  pieSliceText: 'label',
  sliceVisibilityThreshold: 0.05,
  backgroundColor: { fill: 'transparent' },
  titlePosition: 'none'
};

// initializing the chart and calling the redraw function
function drawChart() {
  // chart is global so it can be accessed later to redraw the chart.
  chart = new google.visualization.PieChart(document.getElementById('piechart'));
  redrawChart();
}

// gets the data from the table and draw it in the chart
function redrawChart() {
  var data = google.visualization.arrayToDataTable([['Name', 'Amount']].concat(
    [].slice.call(document.querySelectorAll("#myTable tbody tr")).map(function(tr) {
      return [tr.children[0].innerHTML, parseInt(tr.children[2].innerHTML)];
    })
  ));

  chart.draw(data, options);
}
