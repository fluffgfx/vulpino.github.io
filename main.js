function width() { return $(window).width() }
function height() { return $(window).height() }

// SVG BACKGROUND

var d
var going = false

function go() {
    console.log(width())
    var vertices = d3.range(200).map(function(d) {
        return [Math.random() * width(), Math.random() * height()];
    });

    var voronoi = d3.geom.voronoi()
        .clipExtent([[0, 0], [width(), height()]]);

    var svg = d3.select("body").append("svg")
        .attr("width", width())
        .attr("height", height())
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
    $('svg').remove()
    going = false
}

// resizing

var r;
var ow, oh;

$(window).resize(function(e) {
    clearTimeout(r)
    r = setTimeout(function() {
        if (width() < height() && typeof d !== 'undefined') {
            console.log('stop')
            stop()
        } else if (width() > height() && !going) {
            console.log('go')
            go()
        } else if (width() !== ow || height() !== oh) {
            console.log('stopandgo')
            stop()
            go()
        }
    }, 100)
})