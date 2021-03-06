var margin = {
    top: 20,
    right: 20,
    bottom: 170,
    left: 40
  },
  width = 1240 - margin.left - margin.right,
  height = 570 - margin.top - margin.bottom

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgBub = d3.select(".bubble-chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set the color scheme
var colorBub = d3.scaleOrdinal(d3.schemeCategory10);

// set width and height
// set padding between the bubbles
var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

// get the data
d3.csv("data/russia-people-density.csv", function(d) {
  if (d.value) return d;
}, function(error, classes) {
  if (error) throw error;

// structure
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

// Tooltips
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
    })

  svgBub.selectAll(".bubble")
      // Hide the tooltip
      .on("mouseout", function() {
        d3.select(".tooltip-bub").classed("hidden", true);
      })
});
