$(document).ready(function() {
  // SLIDER
  $(".testimonials").slick({
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  });
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX ANIMATION
  var topPosition = $("#works").offset().top;
  $(window).on("scroll", function() {
    var scrolling = $(document).scrollTop() + $(window).height();
    if (scrolling > topPosition + 300) {
      $(".work").addClass("work-animated");
    }
  });
// XXXXXXXXXXXXXXXXXXXXXXXXXXXX NAV CHANGE
  $(window).on("scroll", function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $(".header__top-container").addClass("fixed-background");
      $(".header__top").addClass("fixed");
    } else if (scroll < 50) {
      $(".header__top-container").removeClass("fixed-background");
      $(".header__top").removeClass("fixed");
    }
  });

// XXXXXXXXXXXXXXXXXXXXXXXXXXXX SCROLLING
  function onScroll() {
    var scrollPos = $(document).scrollTop();
    $(".nav__link").each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.offset().top <= scrollPos + 66 && refElement.offset().top + refElement.outerHeight() > scrollPos + 66) {
        $(".nav__link").removeClass("nav__link--active");
        currLink.addClass("nav__link--active");
      } else {
        currLink.removeClass("nav__link--active");
      }
    });
  }
  $(document).on("scroll", onScroll);
  // smoothscroll
  $(".nav__link[href^='#']").on("click", function(e) {
    e.preventDefault();
    $(document).off("scroll");
    $("nav__link").each(function() {
      $(this).removeClass("nav__link--active");
    });
    $(this).addClass("nav__link--active");

    var target = this.hash;
    var $target = $(target);
    $("html, body").stop().animate({
      scrollTop: $target.offset().top - 65
    }, 500, "swing", function() {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXX FANCY BOX
  $(".work__link").fancybox({
    padding: 2,
    cyclic: true
  });
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXX HAMBUEGER
  $("#menu-button").on("click", function() {
    $("#header").toggleClass("menu-opened");
    $(".menu-button-bar1").toggleClass("animate1");
    $(".menu-button-bar2").toggleClass("animate2");
    $(".menu-button-bar3").toggleClass("animate3");
  });
  $(".nav__element").on("click", function() {
    $("#header").removeClass("menu-opened");
    $(".menu-button-bar1").toggleClass("animate1");
    $(".menu-button-bar2").toggleClass("animate2");
    $(".menu-button-bar3").toggleClass("animate3");
  });
});
