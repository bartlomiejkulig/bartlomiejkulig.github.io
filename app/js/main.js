$(document).ready(function() {
  // dom variables
  var $input = $('#input');
  var $appList = $('.app__list');
  var $app = $('.app');
  var $search = $('.button__search');
  var $listActive = $('.list.active');
  var $loader = $('#loader');

  // TIP LIST PART
  $(document).click(function() {
    hideTipList();
  });

  $input.keyup(function(e) {
    var input = $(this).val();
    changeDisplay();
    wikiRequest({ action: 'opensearch', limit: '5', search: input, format: 'json' })
    .then(function(data) {
      resetTipList();
      if (e.which != 13) {
        showTipList();
      } else {
        hideTipList();
      }
      $.each(data[1], function(i, element) {
        addTip(element);
      });
      setClickFunction();
    });
  });

  $('.app__list--element').click(function() {
    $input .val($(this).text());
    $appList.hide();
  });
  function changeDisplay() {
    $app.addClass('active');
  }
  function setClickFunction() {
    $('.app__list--element').click(function() {
      $input.val($(this).text());
      $appList.hide();
    });
  }
  function showTipList() {
    $appList.show();
  }
  function hideTipList() {
    $appList.hide();
  }
  function addTip(element) {
    $appList.append('<li class="app__list--element">' + element + '</li>');
  }
  function resetTipList() {
    $appList.children().remove();
  }

  // ///////////////////////////////////////////////////
  // MAIN LIST PART
  // triggers

  $search.click(onTrigger);
  $input.keypress(function(e) {
    if (e.which == 13) {
      $search.click();
      return false;
    }
    return true;
  });

  // funckja trigger zbierajaca funkcje on click
  function onTrigger(e) {
    e.preventDefault();
    var input = $input.val();
    if (input.length == 0) { // jezeli pusty searchbar
      return false;
    }
    hideTipList();
    clearInput();
    clearList();
    startLoading();
    removeBorderList();
    // start ajaxowego zapytania
    wikiRequest({ action: 'opensearch', limit: '10', search: input, format: 'json' })
    .then(function(data) {
      var access = data[1]; // ilosc zwroconych wartosci w arrayu
      if (!access) { // jezeli nic nie zostalo zwrocone nic nie rob
        return false;
      }
    	var length = access.length;
    	var i = 0; // poczatkowy counter dla rekurencji
      listUpdate(data, i, length); // rekurencyjnie drugi riqest w funkcji
    }).fail(handleError);
  }

  function listUpdate(data, i, length) {
    wikiRequest({ action: 'query', formatversion: 2,  prop: 'pageimages', titles: data[1][i], format: 'json' }) //pobieranie nowego api
    .then (function(titles) {
      setUI(data, i, titles); // na podstawie danych appendowanie kolejnych elementow do listy
      hideElement(); // chowanie elemntow w czasie iteracji
      i++;
      if (i == length) {   // jezeli i przekracza dlugosc listy (zwykle 10)
       endLoading(); // wyłącz animacje ładowania oraz pokaz dodane do listy bloki
       addBorderList(); // pokaz border w liscie wczesniej schowany
      }
  // jezeli iteracja jest mniejsza niz dlugosc listy powtorz zapytanie dodajac koljeny blok do listy
      if (i < length) {
        listUpdate(data, i, length);
      }
    }).fail(handleError);
  }

function setUI(data, i, titles) {
  var element;
  element  = '<a href="' + data[3][i] + '" class="list__element element">';
  if (titles.query.pages[0].thumbnail) {
    element += '<div class="element__image"><img src="'+ titles.query.pages[0].thumbnail.source +'" alt=""></div>';
  }
  else {
    element += '<div class="element__image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png"></div>';
  }
     element += '<div class="element__description">';
     element += '<h2 class="element__header">' + data[1][i] + '</h2>';
     element += '<p class="element__text">' + data[2][i] + '</p>';
     element += '</div></a>';

 $listActive.append(element);
}

function wikiRequest(parameters) { // szablon dla zapytania wiki api
  return $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    method: "GET",
    data: parameters,
    dataType: 'jsonp'
  })
}

function addBorderList() {
  $listActive.addClass('border');
}
function removeBorderList() {
  $listActive.removeClass('border');
}
function clearInput() {
  $input.val('');
}
function handleError() {
  clearList();
  $listActive.append("<p>Something went wrong ...</p>");
  endLoading();
}
function clearList() {
  $listActive.children().remove();
}
function startLoading() {
  $loader.show();
}
function hideElement() {
  $('.element').hide();
}
function endLoading() {
  $loader.hide();
  $('.element').show();
}
});

// { action: 'opensearch', limit: '10', search: 'bydlo', format: 'json' }
