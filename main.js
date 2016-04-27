var width = $(window).width(),
    height = $(window).height();

// SVG BACKGROUND

var vertices = d3.range(200).map(function(d) {
  return [Math.random() * width, Math.random() * height];
});

var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [width, height]]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", function() { vertices[0] = d3.mouse(this); redraw(); });

var path = svg.append("g").selectAll("path");

redraw();

function redraw() {
  path = path
      .data(voronoi(vertices), polygon);

  path.exit().remove();

  path.enter().append("path")
      .attr("d", polygon)
      .attr('stroke-width', '2')

  path.order();
}

function polygon(d) {
  return "M" + d.join("L") + "Z";
}

var driftConst = 1/10

function drift() {
	var dx = []
  var dy = []
	vertices.forEach(function(v) {
  	var ax = (v[0] - (width/2))/50
    var ay = (v[1] - (height/2))/50
  	dx.push((Math.random() - 0.5) * driftConst * ax)
    dy.push((Math.random() - 0.5) * driftConst * ay)
  })
  driftOn(dx, dy, 500)
}

function driftOn(dx, dy, c, t) {
	clearTimeout(window.drifter)
	if (c === 0) { return }
	x = dx.slice()
  y = dy.slice()
	vertices.forEach(function(v) {
  	var mx = x.pop()
    var my = y.pop()
    if (v[0] + mx < 0 || v[0] + mx > width) {
    	v[0] -= mx
    } else { v[0] += mx }
    if (v[1] + my < 0 || v[0] + my > height) {
    	v[1] -= my
    } else { v[1] += my }
  })
  redraw()
  window.drifter = setTimeout(function() {
  	driftOn(dx, dy, c-1)
  }, 10)
}

function regularlyDrift() {
		setTimeout(function() {
    	drift()
			regularlyDrift()
  	}, 5000)
  }

drift()
regularlyDrift()

// POSITION SET