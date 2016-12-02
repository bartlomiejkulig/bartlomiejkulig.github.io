//######### Menu opening ##########


$(document).ready(function() {

  $("#menu-button").on("click", function() {
    $("header nav").toggleClass("menu-opened");
    $(".menu-button-bar1").toggleClass("animate1");
    $(".menu-button-bar2").toggleClass("animate2");
    $(".menu-button-bar3").toggleClass("animate3");
  });

  $(".menu-content li").on("click", function() {
    $("header nav").removeClass("menu-opened");
  });

});

//############## Scrolling ##########
$(document).ready(function() {

  $("#section-one-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-one").offset().top
  }, 800);

  });

  $("#section-two-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-two").offset().top
  }, 800);

  });

  $("#section-three-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-three").offset().top
  }, 800);

  });

  $("#section-four-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-four").offset().top
  }, 800);

  });

  $("#sub-footer-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#sub-footer").offset().top
  }, 800);

  });

  $(".image-arrow").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-one").offset().top
  }, 800);

  });

});


// #########  Shoiwng elements section 2 #######


$(".section-two-part-1-content").hide();
$(".section-two-part-2-content").hide();
var topPosition1 = $("#section-two-part-1").offset().top;
var topPosition2 = $("#section-two-part-2").offset().top;
$(window).on("scroll", function(event) {
  var scrolling = $(document).scrollTop()+$(window).height();

  if (scrolling  > topPosition1 + 200) {
      $(".section-two-part-1-content").fadeIn(1000);
  }

  if (scrolling > topPosition2 + 200) {
      $(".section-two-part-2-content").fadeIn(1000);
  }

});

// ######################
