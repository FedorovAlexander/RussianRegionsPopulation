
var margin = {top: 20, right: 20, bottom: 120, left: 40},
    width = 1240 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var xScale = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var yScale = d3.scaleLinear()
          .range([height, 0]);
var formatNumber = d3.format(".1f");
var yAxis = d3.axisLeft()
				  .scale(yScale)
				  .ticks(12)
          .tickFormat(function(d) {
            var s = formatNumber(d / 1e6);
            return this.parentNode.nextSibling
            ? "\xa0" + s
            : s + "M";
          })
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("../data/russia-people-density.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.value = +d.value;
  });

  // Scale the range of the data in the domains
  xScale.domain(data.map(function(d) { return d.region; }));
  yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.region); })
      .attr("width", xScale.bandwidth())
      .attr("fill","rgb(0,104,71)")
      .attr("y", function (d, i) {
  			return height;
  		})
      .attr("height", 0)
      .transition()
      .duration(1000)
      .attr("y", function(d,i) { return yScale(d.value); })
      .attr("height", function(d) { return height - yScale(d.value); })

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.7em")
            .attr("transform", function(d) {
                return "rotate(-90)"
                });

  // add the y Axis
  svg.append("g")
      .call(yAxis);

});
