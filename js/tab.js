$(function() {
  $('.tab li').click(function() {
    var index = $('.tab li').index(this);
    $('.tab li').removeClass('active');
    $(this).addClass('active');
    $('.area ul').removeClass('show').eq(index).addClass('show');
  });
});

$(function() {
  $('.tab li').click(function() {
    var discheck = $('#secret_map').css('display');
    if(discheck == "none"){
      $("#secret_map").css("display", "block");
      $("#popular_map").css("display", "none");
    }else{
      $("#secret_map").css("display", "none");
      $("#popular_map").css("display", "block");
    }
  });
});
