var dataset;

d3.csv("../data/russia-people-density.csv", function(data) {
  dataset = data;

  var w = 1200;
  var h = 600;
  var padding = 30;
  var svg = d3.select(".barchart")
              .append("svg")
              .attr("width", w)
              .attr("height", h)

  // var scaleColor = d3.scaleLinear()
  //               .domain([0, d3.max(data, function(d) { return +d.value;} )])
  //               .range([0, 255])
  var xScale = d3.scaleBand()
          .domain(d3.range(dataset.length))
          .rangeRound([0, w])
          .paddingInner(0.05);
  var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.value;} )])
                .range([0, h])

//Define X axis
	var xAxis = d3.axisBottom()
					  .scale(xScale)
					  .ticks(dataset.length)

	//Define Y axis
	var yAxis = d3.axisLeft()
					  .scale(yScale)
					  .ticks(5)

  svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return xScale(i)
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
      //  return "rgb(" + Math.round(scaleColor(j)) + ",155, 155)";
      return "rgb(0,104,71)";
      });

      // labels
  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
      k = d.region
      return k;
    })
    .attr("class", "region-label")
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
       return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
      j = d.value
       return h + 10 ;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")

    //Create X axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    //Create Y axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

});
