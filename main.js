$(document).ready(function(){
  var draw = SVG('drawing');
  var logostring = "M374.5,385.7 l250,250 h-500 L374.5,385.7 z M374.5,635.7 l353.6,353.6 V635.7 H374.5 z M728.1,687.5 l125,125 l125-123.6 l-125-126.4 L728.1,687.5 z M978.1,688.9 V437.5 l-125,125 L978.1,688.9 z M728.1,436.1 v251.4 l125-125 L728.1,436.1 z M198.7,561.5 l175.8-175.8 l-352.6-1 L198.7,561.5 z M249.5,260.7 l125,125 v-250 l-125-125 V260.7 z"
	var logo = draw.path(logostring).fill("white").size($(window).height()/(1.5)).center(($(document).width()/2), ($(document).height()/2)).stroke({color: '#fff', opacity: 0.1, width: 1});
	var image = draw.image("img/background.jpg").size($(document).width()/(1.25), $(document).height()/(1.25)).center(($(document).width()/2), ($(document).height()/2)).clipWith(logo);

  $(window).resize(function(e){
    image.hide().unclip();
    logo = draw.path(logostring).fill("white").size($(window).height()/(1.5)).center(($(document).width()/2), ($(document).height()/2)).stroke({color: '#fff', opacity: 0.1, width: 1});
    image.clipWith(logo).show();
    image.animate(250, '>', 100).size($(document).width()/(1.25), $(document).height()/(1.25)).center(($(document).width()/2), ($(document).height()/2));
  });

  var timer;
  $(window).mousemove(function(e){
    clearInterval(timer);
    var pageX = e.pageX
    var pageY = e.pageY
    timer = setTimeout(function(){
      image.animate(250, '>', 100).center(((pageX/16)-($(window).width()/32))+($(window).width()/2), ((pageY/16)-($(window).height()/32))+($(window).height()/2));
    }, 150);
  });
});
// close my eyes and cross my arms
// put me in the dirt, let me be with the stars
