var dataset;

d3.csv("../data/russia-people-density.csv", function(data) {
  dataset = data;

  var w = 1200;
  var h = 600;
  var padding = 30;
  var formatNumber = d3.format(".1f");
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
                .range([h - padding ,padding])

//Define X axis
	var xAxis = d3.axisBottom()
					  .scale(xScale)
					  .ticks(dataset.length)

	//Define Y axis
	var yAxis = d3.axisLeft()
					  .scale(yScale)
					  .ticks(12)
            // .tickValues([1,2])
            .tickFormat(function(d) {
              var s = formatNumber(d / 1e6);
              return this.parentNode.nextSibling
              ? "\xa0" + s
              : s + "M";
            })



  svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return xScale(i) + 10
      })
      .attr("y", function(d) {
        j = d.value
        return yScale(j);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        j = d.value
        return (yScale(0) - yScale(j))
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
      .attr("class", "axisX")
      .attr("transform", "translate(10," + (h - padding) + ")")
      .call(xAxis);


    //Create Y axis
    svg.append("g")
      .attr("class", "axisY")
      .attr("transform", "translate(" + (padding + 10) + ",0)")
      .call(yAxis)

    //remove first Y tick
    svg.selectAll(".axisY .tick")
    .filter(function (d) { return d === 0;  })
    .remove();

});
