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

var colorBub = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

d3.csv("../data/russia-people-density.csv", function(d) {
  d.value = +d.value;
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
      .attr("id", function(d) { return d.region; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return colorBub(d.package); });

  node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.region; })
    .append("use")
      .attr("xlink:href", function(d) { return "#" + d.data.region; });

  node.append("title")
      .text(function(d) { return d.data.region + "\n" + formatBub(d.value); });
});
