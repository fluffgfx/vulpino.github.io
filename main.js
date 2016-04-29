// only run any of this if there's svg support
if(Modernizr.inlinesvg){

function width() { return $(window).width() }
function height() { return $(window).height() }

// svg

var d
var going = false

function go() {
    var vertices = d3.range(200).map(function(d) {
        return [Math.random() * width(), Math.random() * height()];
    });

    var voronoi = d3.geom.voronoi()
        .clipExtent([[0, 0], [width(), height()]]);

    var svg = d3.select("body").append("svg")
        .attr("width", width())
        .attr("height", height())
        .attr('id', 'background')
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
            var ax = (v[0] - (width()/2))/50
            var ay = (v[1] - (height()/2))/50
            dx.push((Math.random() - 0.5) * driftConst * ax)
            dy.push((Math.random() - 0.5) * driftConst * ay)
        })
        driftOn(dx, dy, 500)
    }
    
    var drifter;

    function driftOn(dx, dy, c, t) {
        clearTimeout(drifter)
        if (c === 0) { return }
        x = dx.slice()
        y = dy.slice()
        vertices.forEach(function(v) {
            var mx = x.pop()
            var my = y.pop()
            if (v[0] + mx < 0 || v[0] + mx > width()) {
                v[0] -= mx
            } else { v[0] += mx }
            if (v[1] + my < 0 || v[0] + my > height()) {
                v[1] -= my
            } else { v[1] += my }
        })
        redraw()
        drifter = setTimeout(function() {
            driftOn(dx, dy, c-1)
        }, 10)
    }

    function regularlyDrift() {
        d = setTimeout(function() {
            drift()
            regularlyDrift()
        }, 5000)
    }

    drift()
    regularlyDrift()
    going = true
}

if (width() > height()) { go() }

function stop() {
    clearTimeout(d)
    $('#background').remove()
    going = false
}

// resizing

var r;
var ow, oh;

$(window).resize(function(e) {
    clearTimeout(r)
    r = setTimeout(function() {
        if (width() < height() && typeof d !== 'undefined') {
            stop()
        } else if (width() > height() && !going) {
            go()
        } else if (width() !== ow || height() !== oh) {
            stop()
            go()
        }
        logo.attr('transform', 'scale(0.25) ' + 'translate(' + ((width()*2)-($('#logoSvgG')[0].getBBox().width/2)) + ' ' + ((height()*(3/5))-($('#logoSvgG')[0].getBBox().height/4)) + ')')
    }, 100)
})

// draggy logo

var path = d3.geo.path()
var voronoi = d3.geom.voronoi()
var force = d3.layout.force().size(500, 500)

var logostrings = [["M",374.5,",",385.7," l",250,",",250," h",-500," L",374.5,",",385.7," z"], ["M",374.5,",",635.7," l",353.6,",",353.6," V",635.7," H",374.5," z"], ["M",728.1,",",687.5," l",125,",",125," l",125,-123.6," l",-125,-126.4," L",728.1,",",687.5," z"], ["M",978.1,",",688.9," V",437.5," l",-125,",",125," L",978.1,",",688.9," z"], ["M",728.1,",",436.1," v",251.4," l",125,-125," L",728.1,",",436.1," z"], ["M",198.7,",",561.5," l",175.8,-175.8," l",-352.6,-1," L",198.7,",",561.5," z"], ["M",249.5,",",260.7," l",125,",",125," v",-250," l",-125,-125," V",260.7," z"]]

var logo = d3.select('#logo').append('svg:svg')
  .attr('width', '100vw')
  .attr('height', '100vh')
  .append('svg:g')
  .attr('id', 'logoSvgG')
  .attr('stroke-width', '5')
  .attr('stroke', '#000')
  .attr('transform', 'scale(0.25) ' + 'translate(' + ((width()*2)-($('#logoSvgG')[0].getBBox().width/2)) + ' ' + ((height()*(3/5))-($('#logoSvgG')[0].getBBox().height/4)) + ')')

	
var nodes = [], links = []

logostrings.forEach(function(ls) { 
  var tangram = logo.append('svg:path')
  	.attr('d', ls.join(''))
  var bb = tangram.node().getBBox()
  var centroid = [bb.x + bb.width/2, bb.y + bb.height/2]
  centroid.x = centroid[0]
  centroid.y = centroid[1]
  centroid.d = ls.join('')
  tangram.remove()
  nodes.push(centroid)
})

voronoi.links(nodes).forEach(function(l) {
  var dx = l.source.x - l.target.x
  var dy = l.source.y - l.target.y
  l.distance = Math.sqrt(dx * dx + dy * dy)
  links.push(l)
})

force
  .gravity(0)
  .friction(0.05)
  .nodes(nodes)
  .links(links)
  .linkDistance(function(d) { return d.distance })
  .start()

var node = logo.selectAll('g')
  .data(nodes)
  .enter().append("g")
  .attr("transform", function(d) { return "translate(" + -d.x + "," + -d.y + ")"; })
  .call(force.drag)
  .append("path")
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
  .attr("d", function(d) { return d.d })
  
logo.attr('transform', 'scale(0.25) ' + 'translate(' + ((width()*2)-($('#logoSvgG')[0].getBBox().width/2)) + ' ' + ((height()*(7/10))-($('#logoSvgG')[0].getBBox().height/4)) + ')')

force.on("tick", function(e) {
  node.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")"
  })
})

} else {
    $(document).ready(function(){ $('#logo').html('<img src="logo.png" />') })
}
