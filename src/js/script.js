var marginPie = {
    top: 20,
    right: 20,
    bottom: 120,
    left: 40
  },
  widthPie = 1240 - marginPie.left - marginPie.right,
  heightPie = 500 - marginPie.top - marginPie.bottom;
var svgPie = d3.select(".piechart")
            .append("svg")
            .attr("width", widthPie + marginPie.left + marginPie.right)
            .attr("height", heightPie + marginPie.top + marginPie.bottom)
            .append("g")
            .attr("transform", "translate(" + marginPie.left + "," + marginPie.top + ")");

d3.csv("../data/russia-people-density.csv", function(error, data) {
  if (error)
    throw error;


})
