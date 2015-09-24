$(document).ready(function(){
    var draw = SVG('drawing');
	var logo = draw.path("M374.5,385.7 l250,250 h-500 L374.5,385.7 z M374.5,635.7 l353.6,353.6 V635.7 H374.5 z M728.1,687.5 l125,125 l125-123.6 l-125-126.4 L728.1,687.5 z M978.1,688.9 V437.5 l-125,125 L978.1,688.9 z M728.1,436.1 v251.4 l125-125 L728.1,436.1 z M198.7,561.5 l175.8-175.8 l-352.6-1 L198.7,561.5 z M249.5,260.7 l125,125 v-250 l-125-125 V260.7 z").fill("white").size(300).center(($(document).width()/2), ($(document).height()/10)*3);
	var image = draw.image("img/bg1.jpg").size($(document).width(), $(document).height()).center(($(document).width()/2), ($(document).height()/10)*3).clipWith(logo);
});
// i'm so tired
// i fight so hard and come back beaten