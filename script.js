$(document).ready(function() {
  function setTo100() {
    $('.percent').html('100');
  }
  function clearPreloader() {
    $('.preload').addClass('hidden');
  }
  function increment() {
    var num = $('.percent').html();
    if (parseInt(num, 10) === 97) {
      clearInterval(incInterval);
      setTimeout(setTo100, 1000);
      setTimeout(clearPreloader, 1500);
    } else {
      var newNum = parseInt(num, 10) + 1;
      $('.percent').html(newNum);
    }
  }
  var incInterval = setInterval(increment, 50);

  $(window).load(function() {
    clearInterval(incInterval);
    $('.percent').html('100');
    setTimeout(clearPreloader, 300);
  });
});

$(window).scroll(function() {
  var height = $(document).height();
  var footerHeight = $('footer').height();
  var statusBottom = height - $('#status-div').offset().top - $('#status-div').outerHeight();
  if (statusBottom <= footerHeight) {
    $('#status-div').css('opacity', 0)
  } else {
    $('#status-div').css('opacity', 1)
  }
});
