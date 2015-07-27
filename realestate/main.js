$(document).ready(function(){
	console.log("Setting up!");

	// Following lines are for the clickable menu and submenu to work
	var lastClick = "";

	function setContent(content) {
		var getUrl = "assets/" + content + ".html";
		$.get(getUrl, function(data){
			$(".content").html(data);
		});
		if(!$(".content").is(":visible")){
			$(".content").slideDown("fast");
		}
	}

	function setSubMenu(menu) {
		var getMenuUrl = "assets/menus/" + menu + ".html";
		$.get(getMenuUrl, function(data){
			$(".sub-menu").html(data);
		}).fail(function(){
			return;
		}).done(function(){
			if(!$(".sub-menu").is(":visible")){
				$(".sub-menu").slideDown("fast");
			}
		});		
	}

	function clearSubMenu() {
		$(".sub-menu").html("");
	}

	function handleClick(data) {
		if($(this).attr('href') === '#'){ // some of the links (the contact links) actually link so dont do anything to those
			var ourClass = $(this).attr('class').split(" ")[0];
			var ourLink = ourClass.substring(5, ourClass.length);
			if(ourLink === lastClick)
				return;
			lastClick = ourLink;
			setContent(ourLink);
			setSubMenu(ourLink);
			$("[class|='link']").off(".menuSelect");
			// need to set a timeout here because if we set up the event too fast
			// then it won't catch the submenu items in its selector (weird)
			setTimeout(function(){
				$("[class|='link']").on("click.menuSelect", handleClick);
				$(".content").scrollTo(0);
			}, 200)
		}
	}

	$("[class|='link']").on("click.menuSelect", handleClick);

	// hides the content and submenu initially
	$(".content").hide();
	$(".sub-menu").hide();

	// RESPONSIVENESS
	// AINT IT COOL

	function showMenu(){
		$(".hamburger").css("top", "160px");
		$(".hamburger").css("height", "160px");
		$(".menu-link").css("top", "160px");
		$(".menu-link").css("color", "#777");
		$(".menu-link i").attr("class", "fa fa-times");
		$(".menu-link").off(".showMenu");
		$(".menu-link").on("click.hideMenu", hideMenu);
	}

	function hideMenu(){
		$(".hamburger").css("top", "0px");
		$(".hamburger").css("height", "160px");
		$(".menu-link").css("top", "0px");
		$(".menu-link").css("color", "white");
		$(".menu-link i").attr("class", "fa fa-bars");
		$(".menu-link").off(".hideMenu");
		$(".menu-link").on("click.showMenu", showMenu);
	}

	// lazy responsiveness it doesn't rethink on resize
	// i probably could make it but this will do for now
	if($(document).width() < 652){ // this is the break point where .content stops appearing for whatever reason
		//now we hamburger
		$(".home-menu").hide();
		$(".content").width($(document).width()-64);
		// header height is (14em) from my measurements so
		maxHeight = (($(document).height()/16)-14).toString() + "em";
		$(".content").css("max-height", maxHeight);
		$(".menu-link").on("click.showMenu", showMenu);
	}else{
		$(".hamburger").hide();
		$(".menu-link").hide();
	}

	console.log("All set up!");	
});

