$(function() {
  var $list = $("#list");
  var $newElement = $("#new-element");
  var $addElement = $("#add-element");
  var $listElement = $("li");
  var $textInput = $("input:text");

// #########################################

  $listElement.hide().each(function(index) {
    $(this).delay(400 * index)
           .fadeIn(1000);
  });

// #########################################

  function listCount() {
    var productsNumber = $("li.element:not(.complete)").length;
    $("#counter-value").text(productsNumber);
  }
  listCount();

// #########################################

  $newElement.show();
  $addElement.hide();

  $newElement.on("click", function() {
    $newElement.hide();
    $addElement.show();
    $addElement.delay(5000).hide(0);
    $newElement.delay(5000).show(0);
  });

  function focus() {
    $textInput.on("focusin", function() {
      $addElement.stop().show();
      $newElement.stop().hide();
    });

    $textInput.on("focusout", function() {
      $addElement.delay(5000).hide(0);
      $newElement.delay(5000).show(0);
    });
  }
  focus();


  // #########################################

  $addElement.on("submit", function(e) {
    var productsNumber = $("li.element:not(.complete)").length;
    e.preventDefault();
    var textValue = $addElement.find("input:text").val();
    if (textValue !== "") {
      if (productsNumber === 0) {
        $list.prepend("<li class='element'>" + textValue + "</li>");
      } else {
        $("li.element:not(.complete):last").after("<li class='element'>" + textValue + "</li>");
      }
      $addElement.find("input:text").val("");
      $addElement.delay(5000).hide(0);
      $newElement.delay(5000).show(0);
      listCount();
      focus();
    }
  });

  $textInput.keypress(function(e) {
    if (e.which === 13) {
      $addElement.submit();
    }
    return false;
  });

  // #########################################

  $list.on("click", "li", function() {
    var $this = $(this);
    var complete = $this.hasClass("complete");

    if (complete === true) {
      $this.animate({
        opacity: 0,
        paddingLeft: "+=200"
      }, 1000, function() {
        $this.remove();
      });
    }  else {
      var textValue = $this.text();
      $this.animate({
        opacity: 0
      }, 1000, function() {
        $this.remove();
        $list.append("<li class='element complete'>" + textValue + "</li>");
        listCount();
      });
    }
  });
});
