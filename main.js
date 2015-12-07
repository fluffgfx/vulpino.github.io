$(document).ready(function(){
  var draw = SVG('drawing');
  var logostring = "M374.5,385.7 l250,250 h-500 L374.5,385.7 z M374.5,635.7 l353.6,353.6 V635.7 H374.5 z M728.1,687.5 l125,125 l125-123.6 l-125-126.4 L728.1,687.5 z M978.1,688.9 V437.5 l-125,125 L978.1,688.9 z M728.1,436.1 v251.4 l125-125 L728.1,436.1 z M198.7,561.5 l175.8-175.8 l-352.6-1 L198.7,561.5 z M249.5,260.7 l125,125 v-250 l-125-125 V260.7 z"
	var logo = draw.path(logostring).fill("white").size($(window).height()/(1.5)).center(($(window).width()/2), ($(window).height()/2)).stroke({color: '#fff', opacity: 0.1, width: 1});
	var image = draw.image("img/background2.jpg").size($(window).width()/(1.25), $(window).height()/(1.25)).center(($(window).width()/2), ($(window).height()/2)).clipWith(logo);
  var scrolled = false;
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
          kyle.center(150, 20);
          kyle.font({
            family: 'brandon-grotesque',
            weight: 900,
            size: 48
          });
        }else{
          image.center(($(window).width()/3)+150, $(window).height()/2);
          image.size($(window).width(), $(window).height());
          kyle.font({
            family: 'brandon-grotesque',
            weight: 900,
            size: ($(window).height()/3)
          });
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

  $(window).hover(toggleLogo);

  $(window).resize(function(e){
    image.hide().unclip();
    logo = draw.path(logostring).fill("white").size($(window).height()/(1.5)).center(($(window).width()/2), ($(window).height()/2)).stroke({color: '#fff', opacity: 0.1, width: 1});
    image.clipWith(logo).show().size($(window).width()/(1.25), $(window).height()/(1.25)).center(($(window).width()/2), ($(window).height()/2));
  });

  $(window).scroll(function(e){
    if($(window).scrollTop() < 5){
      image.hide().unclip();
      logo = draw.path(logostring).fill("white").size($(window).height()/(1.5)).center(($(window).width()/2), ($(window).height()/2)).stroke({color: '#fff', opacity: 0.1, width: 1});
      image.clipWith(logo).show();
      image.size($(window).width()/(1.25), $(window).height()/(1.25)).center(($(window).width()/2), ($(window).height()/2));
      $("#header").css("opacity", "0");
      $("#drawing").css("background-color", "rgba(255,255,255,1)");
    }else if($(window).scrollTop() >= 5 && $(window).scrollTop() <= 55){
      var percent = -(($(window).scrollTop()-5)/55)+1;
      var size = ($(window).height()/(1.5))*percent;
      if(size < 100){
        size = 100
      }
      var imageSizeX = ($(window).width()/(1.25))*percent;
      if(imageSizeX < 150){
        imageSizeX = 150
      }
      var imageSizeY = ($(window).height()/(1.25))*percent;
      if(imageSizeY < 150){
        imageSizeY = 150
      }
      var centerX = ($(window).width()/(2))*percent;
      if(centerX < 175){
        centerX = 175
      }
      var centerY = ($(window).height()/(2))*percent;
      if(centerY < 75){
        centerY = 75
      }
      image.hide().unclip();
      logo = draw.path(logostring).fill("white").size(size).center(centerX, centerY).stroke({color: '#fff', opacity: 0.1, width: 1});
      image.clipWith(logo).show();
      image.size(imageSizeX, imageSizeY).center(centerX, centerY);
    }else{
      image.hide().unclip();
      logo = draw.path(logostring).fill("white").size(100).center(175,75);
      image.clipWith(logo).show();
      image.size(175, 175).center(175,75);
      $("#header").css("opacity", "1");
      $("#drawing").css("background-color", "rgba(255,255,255,0)");
      $(window).off();
      $("#header").click(toggleLogo);
      scrolled = true;
    }
  });
});
// close my eyes and cross my arms
// put me in the dirt, let me be with the stars
