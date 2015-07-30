$(document).ready(function(){
    var draw = SVG('drawing');
    var backgrounds = ["img/bg1.jpg", "img/bg2.jpg", "img/bg3.jpeg", "img/bg4.jpeg", "img/bg5.jpg", "img/bg6.jpg"];
    var image = draw.image(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
    image.size($(document).width()-16, $(document).height()-16)
    var text = draw.path("M187,130L187 219 277.5 303.5 160 303.5 223 360 160 422 277.5 422 440 592.5 440 418 501 476.5 562 420.5 562 300.5 503.5 361.25 440.5 301 440 415.5 393 415.5 280 305 280 221.5 z").fill("none").size(300).center(($(document).width()/2), ($(document).height()/2));
    var anim = false;
    $("#drawing svg image").on("click", function(){
        if(!anim){
            anim = true
            var moveX = Math.random()*500-250;
            var moveY = Math.random()*500-250;
            image.animate(300, '<>', 0).dmove(moveX,moveY).after(function() {
                this.animate(300, '<>', 0).dmove(-moveX,-moveY).after(function(){
                    anim=false;
                });
            });  
        }
    });
    image.clipWith(text).attr({ onmouseover: '$("#drawing svg image").trigger("click");' });

    if($(document).width() < 690){
        $("#about").width($(document).width()-160);
        $("#about").height(630);
        $("#about").css("top", "0");
    }
    $("#about-link").on("click", function(){
        $("#about").slideToggle();
    });
});
// oh, but yeah i'm so tired
// i fight so hard and come back beaten