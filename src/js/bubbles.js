var margin = {
    top: 20,
    right: 20,
    bottom: 120,
    left: 40
  },
  width = 1240 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom

var svgBub = d3.select(".bubble-chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var formatBub = d3.format(",d");

var colorBub = d3.scaleOrdinal(d3.schemeCategory10);

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

d3.csv("../data/russia-people-density.csv", function(d) {
  if (d.value) return d;
}, function(error, classes) {
  if (error) throw error;

  var root = d3.hierarchy({children: classes})
      .sum(function(d) { return d.value; })
      .each(function(d) {
        if (id = d.data.region) {
          var id, i = id.lastIndexOf(".");
          d.id = id;
          d.package = id.slice(0, i);
          d.class = id.slice(i + 1);
        }
      });

  var node = svgBub.selectAll(".node")
    .data(pack(root).leaves())
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
      .attr("class", function(d) { return "bubble " + d.data.region; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return colorBub(d.package); });

  node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.region; })
    .append("use")
      .attr("xlink:href", function(d) { return "#" + d.data.region; });

  svgBub.selectAll(".bubble")
    .on("mousemove", function(d) {

      var xPosition = d3.event.pageX;
      var yPosition = d3.event.pageY;

      // Make units correct
      function tooltipText(j) {
        j = d.value;
        if (j % 10 > 4 || j % 10 <= 1) {
          return j + " человек"
        }
        else {
          return j + " человека"
        }
      }
      //Update the tooltip position, value and label
      d3.select(".tooltip-bub")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select(".tooltip-bub__text--value")
        .text(tooltipText())
      d3.select(".tooltip-bub")
        .select(".tooltip-bub__text--label")
        .text(d.data.region);

      // Show the tooltip
      d3.select(".tooltip-bub")
      .classed("hidden", false)
      .transition(500)
    })

  svgBub.selectAll(".bubble")
      // Hide the tooltip
      .on("mouseout", function() {
        d3.select(".tooltip-bub").classed("hidden", true);
      })
});
