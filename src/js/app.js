var dataset;

d3.csv("../data/russia-people-density.csv", function(data) {
  dataset = data;

  var w = 1200;
  var h = 600;
  // var barPadding = 1;

  var svg = d3.select(".barchart")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
  var scaleColor = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.value;} )])
                .range([0, 255])
  var xScale = d3.scaleBand()
          .domain(d3.range(dataset.length))
          .rangeRound([0, w])
          .paddingInner(0.05);
  var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.value;} )])
                .range([0, h])

  svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return i * (w / dataset.length);
      })
      .attr("y", function(d) {
        j = d.value
        return h - yScale(j);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        j = d.value
        return yScale(j)
      })
      .attr("fill", function(d) {
        j = d.value
        // console.log("rgb(" + Math.round(scaleColor(j)) + ", 0, 0)")
       return "rgb(" + Math.round(scaleColor(j)) + ",155, 155)";
      });

      // labels
  svg.selectAll("text")
    .data(dataset)
    .text(function(d) {
      k = d.region
      return k
    })
    .attr("x", function(d,i) {

    })
});
