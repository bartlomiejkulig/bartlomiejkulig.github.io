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
  }, 300);

  });

  $("#section-two-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-two").offset().top
  }, 400);

  });

  $("#section-three-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-three").offset().top
  }, 500);

  });

  $("#section-four-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#section-four").offset().top
  }, 600);

  });

  $("#sub-footer-anchor").on("click", function(){

    $('html, body').animate({
    scrollTop: $("#sub-footer").offset().top
  }, 700);

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

$(window).on("scroll", function(event) {

  var topPosition1 = $("#section-two-part-1").offset().top;
  var topPosition2 = $("#section-two-part-2").offset().top;

  var scrolling = $(document).scrollTop();


  if (scrolling  > topPosition1 - 500) {
      $(".section-two-part-1-content").fadeIn(1000);
      event.preventDefault();
  }

  if (scrolling > topPosition2 - 500) {
      $(".section-two-part-2-content").fadeIn(1000);
      event.preventDefault();
  }

});

// ######################
