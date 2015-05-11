$(document).ready(function (){
  function setContentToPage(page) {
    page = '/kinghorn/' + page + '.html';
    $.get(page, function(data) {
      $('#c').html(data);
    });
  }

  $('#about').click(function(){
    setContentToPage('about');
  }

  $('#crop-gradient').click(function(){
    setContentToPage('cropAndGradient');
  }

  $('#sketches').click(function(){
    setContentToPage('sketches');
  }

  $('#rain').click(function(){
    setContentToPage('rain');
  }

  $('#triple-frame').click(function(){
    setContentToPage('tripleFrame');
  }

  $('#pen').click(function(){
    setContentToPage('pen');
  }

  $('#logos').click(function(){
    setContentToPage('logos');
  }

  $('#rhino').click(function(){
    setContentToPage('rhino');
  }

  $('#flash').click(function(){
    setContentToPage('flash');
  }

  $('#tech').click(function(){
    setContentToPage('tech');
  }

});

