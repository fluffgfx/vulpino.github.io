$(document).ready(function(){
  var draw = SVG('drawing');
  var logostring = "M374.5,385.7 l250,250 h-500 L374.5,385.7 z M374.5,635.7 l353.6,353.6 V635.7 H374.5 z M728.1,687.5 l125,125 l125-123.6 l-125-126.4 L728.1,687.5 z M978.1,688.9 V437.5 l-125,125 L978.1,688.9 z M728.1,436.1 v251.4 l125-125 L728.1,436.1 z M198.7,561.5 l175.8-175.8 l-352.6-1 L198.7,561.5 z M249.5,260.7 l125,125 v-250 l-125-125 V260.7 z"
	var logo = draw.path(logostring).fill("white").size(100).center(175, 75).stroke({color: '#fff', opacity: 0.1, width: 1});
	var image = draw.image("img/background2.jpg").size(175, 175).center(175, 75).clipWith(logo);
  var scrolled = true;
  var onLogo = true;
  var toggling = false;

  var toggleLogo = function() {
    if(toggling){ return; }
    toggling = true;
    if(onLogo){
      // fade out logo
      image.animate(50, '>').opacity(0).after(function(){
        // Hide logo
        image.hide().unclip();
        // Toggle to text
        var kyle = draw.text("Kyle\nFahringer").fill("white");
        kyle.center(150, 0);
        if(scrolled) {
          image.size(350, 250);
          kyle.center(150, 62.5);
          kyle.font({
            family: 'museo-sans',
            weight: 900,
            size: 48,
            leading: "0.75em"
          });
          $("#logo-bg").css("width", "255px");
        }else{
          image.center(($(window).width()/3)+150, $(window).height()/2);
          image.size($(window).width(), $(window).height());
          kyle.font({
            family: 'museo-sans',
            weight: 900,
            size: 96,
            leading: "0.75em"
          });
          var halflength = kyle.height()/2;
          kyle.center($(window).width()/2, $(window).height()/2 - halflength);
        }
        image.clipWith(kyle).show().animate(150, '>').opacity(1).after(function(){
          toggling = false;
        });
      });
      onLogo = false;
    }else{
      // fade out text
      image.animate(50, '>').opacity(0).after(function(){
        // Hide text
        image.hide().unclip();
        // Toggle to logo
        var logo = draw.path(logostring).fill("white")
        if(scrolled) {
          image.size(175,175);
          image.center(175,75);
          logo.size(100).center(175,75);
          $("#logo-bg").css("width", "150px");
        }else{
          logo.size($(window).height()/(1.5));
          logo.center($(window).width()/2, $(window).height()/2);
        }
        image.clipWith(logo).show().animate(150, '>').opacity(1).after(function(){
          toggling = false;
        });
      });
      onLogo = true;
    }
  }

  $("#logo-bg").click(toggleLogo);
});
// close my eyes and cross my arms
// put me in the dirt, let me be with the stars
