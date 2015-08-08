$(document).ready(function(){
	function dayDiff(first, second) {
		return Math.round((second-first)/(1000*60*60*24));
	}

	function hourDiff(first, second) {
		return Math.round((second-first)/(1000*60*60));
	}

	var startDate = new Date(2013, 07, 13);
	var endDate = new Date(2017, 05, 02);
	var thisDate = new Date();

	$("#text2").html("The " + dayDiff(startDate, thisDate).toString() + "th Day");
	$("#text3").html("-" + hourDiff(thisDate, endDate).toString() + " Hours Remain-");
});