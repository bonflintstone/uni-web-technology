google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([['Name', 'Amount']].concat(
    Array.prototype.slice.call(document.querySelectorAll("tbody tr")).map(function(tr) {
      return [tr.children[0].innerHTML, parseInt(tr.children[2].innerHTML)];
    })
  ));

  console.log(data);

  var options = {
    title: 'Amount in Stock',
    legend: 'none',
    pieSliceText: 'label',
    sliceVisibilityThreshold: 0.05
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
