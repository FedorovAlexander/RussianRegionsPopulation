var dataset;

d3.csv("../data/russia-people-density.csv", function(data) {
  dataset = data;

  var w = 1200;
  var h = 600;
  var barPadding = 1;
 // var maxValue = ;
 var min = d3.min(data, function(d) { return +d.value;} );
// console.log(maxValue)
console.log(min)
  var svg = d3.select(".barchart")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
var scaleColor = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return +d.value;} )])
              .range([0, 255])

  svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return i * (w / dataset.length);
      })
      .attr("y", function(d) {
        return h - (d.value * 0.00002);
      })
      .attr("width", w / dataset.length - barPadding)
      .attr("height", function(d) {
        return d.value * 0.00002
      })
      .attr("fill", function(d) {
        j = d.value
        console.log("rgb(" + Math.round(scaleColor(j)) + ", 0, 0)")
       return "rgb(" + Math.round(scaleColor(j)) + ",255, 0)";
      });
});
