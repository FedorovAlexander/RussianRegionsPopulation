// var dataset;
//
// d3.csv("../data/russia-people-density.csv", function(data) {
//   dataset = data;
//
//   var w = 1200;
//   var h = 600;
//   var padding = 30;
//   var formatNumber = d3.format(".1f");
//   var svg = d3.select(".barchart")
//               .append("svg")
//               .attr("width", w)
//               .attr("height", h)

  // var scaleColor = d3.scaleLinear()
  //               .domain([0, d3.max(data, function(d) { return +d.value;} )])
  //               .range([0, 255])
  // var xScale = d3.scaleBand()
  //               .domain(d3.range(dataset.length))
  //               .rangeRound([0, w])
  //               .paddingInner(0.05);
  // var yScale = d3.scaleLinear()
  //               .domain([0, d3.max(data, function(d) { return +d.value;} )])
  //               .range([h - padding ,padding])

  // var xScale = d3.scaleBand()
  //           .range([0, w])
  //           .padding(0,05)
  // var yScale = d3.scaleLinear()
  //           .range([h, 0])
  //
  // xScale.domain(data.map(function(d) { return d.region }))
  // yScale.domain([0, d3.max(data, function(d) {return +d.value})])

// //Define X axis
// 	var xAxis = d3.axisBottom()
// 					  .scale(xScale)
// 					  .ticks(dataset.length)


	//Define Y axis
	// var yAxis = d3.axisLeft()
	// 				  .scale(yScale)
	// 				  .ticks(12)
  //           .tickFormat(function(d) {
  //             var s = formatNumber(d / 1e6);
  //             return this.parentNode.nextSibling
  //             ? "\xa0" + s
  //             : s + "M";
  //           })



  // svg.selectAll("rect")
  //     .data(dataset)
  //     .enter()
  //     .append("rect")
  //     .attr("x", function(d, i) {
  //       return xScale(i) + 10
  //     })
  //     .attr("y", function(d) {
  //       j = d.value
  //       return yScale(j);
  //     })
  //     .attr("width", xScale.bandwidth())
  //     .attr("height", function(d) {
  //       j = d.value
  //       return (yScale(0) - yScale(j))
  //     })
  //     .attr("fill", function(d) {
  //       j = d.value
  //     //  return "rgb(" + Math.round(scaleColor(j)) + ",155, 155)";
  //     return "rgb(0,104,71)";
  //     });



  // svg.selectAll("rect")
  //     .data(dataset)
  //     .enter()
  //     .append("rect")
  //     .attr("x", function(d) {
  //       return (xScale(d.region) + 2*padding)
  //     })
  //     .attr("y", function(d) {
  //       return yScale(+d.value);
  //     })
  //     .attr("width", xScale.bandwidth())
  //     .attr("height", function(d) {
  //       return (yScale(0) - yScale(+d.value) - padding)
  //     })
  //     .attr("fill", function(d) {
  //       // j = d.value
  //     //  return "rgb(" + Math.round(scaleColor(j)) + ",155, 155)";
  //     return "rgb(0,104,71)";
  //     });




      // labels
  // svg.selectAll(".axisX .tick")
  //   .data(dataset)
  //   .enter()
  //   .append("text")
  //   .text(function(d) {
  //     k = d.region
  //     return k;
  //   })
  //   .attr("class", "region-label")
  //   .attr("text-anchor", "middle")
  //   .attr("x", function(d, i) {
  //      return xScale(i) + xScale.bandwidth() / 2;
  //   })
  //   .attr("y", function(d) {
  //     j = d.value
  //      return h + 10 ;
  //   })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "11px")
  //   .attr("fill", "white")

    // //Create X axis
    // svg.append("g")
    //   .attr("class", "axisX")
    //   .attr("transform", "translate(30," + (h - padding) + ")")
    //   .call(xAxis);
    //

    // //Create Y axis
    // svg.append("g")
    //   .attr("class", "axisY")
    //   .attr("transform", "translate(" + (padding + 10) + ",0)")
    //   .call(yAxis)

//     //remove first Y tick
//     svg.selectAll(".axisY .tick")
//       .filter(function (d) { return d === 0;  })
//       .remove();
//
// });

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
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
      .attr("y", function(d) { return yScale(d.value); })
      .attr("height", function(d) { return height - yScale(d.value); })
      .attr("fill","rgb(0,104,71)");

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

  // add the y Axis
  svg.append("g")
      .call(yAxis);

});
