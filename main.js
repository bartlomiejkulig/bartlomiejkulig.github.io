$(document).ready(function() {
  // variants of temperature
  var tempUnit = {
    tempCelc: 0,
    tempFaren: 0
  };
  // get geolocation
  (function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // set location parameters
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        // GET ACCUWEATHER KEY LOCANTION
        // 1.set api link
        var location1 = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=zzAfeglXAfMDmaUvaXyKGbAliKG2VAQy&q=';
        var location2 = '%2C';
        // 2.finished api key link
        var locationApi = location1 + lat + location2 + long;
        // 3.ajax request to get a place key
        $.ajax({
          method: 'GET',
          url: locationApi,
          beforeSend: loaderShow,
          success: getKey,
          error: error
        });
        // sucess ajax function with location key
        function getKey(data) {
          console.log(data);
          var geoKey = data.Key;
          var city = data.SupplementalAdminAreas[0].EnglishName + "<br>" + data.EnglishName;
          // set wetaher api
          var weather1 = 'http://dataservice.accuweather.com/currentconditions/v1/';
          var weather2 = '?apikey=zzAfeglXAfMDmaUvaXyKGbAliKG2VAQy&details=true';
          // compelte weather api url
          var weatherApi = weather1 + geoKey + weather2;
          // get weather
          $.ajax({
            method: 'GET',
            url: weatherApi,
            // set weather values for dom
            success: setUI,
            complete: loaderHide,
            error: error
          });
          // ser UI
          function setUI(data) {
            // set global variables of temp
            tempUnit.tempCelc = data[0].Temperature.Metric.Value;
            tempUnit.tempFaren = data[0].Temperature.Imperial.Value;
            // url for icon
            var icon = padToTwo(data[0].WeatherIcon);
            // set UI data
            $('#city').html(city);
            $('#lat').html('Latitude<br>' + lat.toFixed(3));
            $('#long').html('Longitude<br>' + long.toFixed(3));
            $('#day').html(data[0].LocalObservationDateTime.slice(0, 10));
            $('#hour').html(data[0].LocalObservationDateTime.slice(11, 19));
            $('#icon').attr('src', 'https://developer.accuweather.com/sites/default/files/' + icon + '-s.png');
            $('#temperature').html(data[0].Temperature.Metric.Value);
            $('#description').html(data[0].WeatherText);
            $('#humadity').html(data[0].RelativeHumidity);
            $('#wind').html(data[0].Wind.Speed.Metric.Value);
          }
        }
      });
    }
  })();

// ////////////////////////////
  // toogle temperature unit
  $('#temp-toogle').on('click', function() {
    if ( $('#temperature').html() == tempUnit.tempCelc) {
      $('#temperature').html(tempUnit.tempFaren);
    } else {
      $('#temperature').html(tempUnit.tempCelc);
    }
  });

// ///////////////////////////////
// SET TEMPERATURE ON NEW LOCATION

$('#submit').on('click', weatherSearch);

$("#input").keyup(function(e){
    if(e.keyCode == 13){
        $("#submit").click();
    }
});

function weatherSearch() {
  if ($('#input').val() != '') {
    var inputVal = $('#input').val();
    var search1 = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=zzAfeglXAfMDmaUvaXyKGbAliKG2VAQy&q=';
    var searchApi = search1 + inputVal;
    console.log(searchApi);
    $.ajax({
      method: 'GET',
      url: searchApi,
      // set weather values for dom
      beforeSend: loaderShow,
      success: getKey,
      error: error
    });

    function getKey(data) {
      var geoKey = data[0].Key;
      var city = data[0].EnglishName;
      console.log(data[0]);
      var lat = data[0].GeoPosition.Latitude;
      var long = data[0].GeoPosition.Longitude;
      // set wetaher api
      var weather1 = 'http://dataservice.accuweather.com/currentconditions/v1/';
      var weather2 = '?apikey=zzAfeglXAfMDmaUvaXyKGbAliKG2VAQy&details=true';
      // compelte weather api url
      var weatherApi = weather1 + geoKey + weather2;
      // get weather
      $.ajax({
        method: 'GET',
        url: weatherApi,
        // set weather values for dom
        success: setUI,
        complete: loaderHide,
        error: error
      });
      // ser UI
      function setUI(data) {
        // set global variables of temp
        tempUnit.tempCelc = data[0].Temperature.Metric.Value;
        tempUnit.tempFaren = data[0].Temperature.Imperial.Value;
        // url for icon
        var icon = padToTwo(data[0].WeatherIcon);
        // set UI data
        $('#city').html(city);
        $('#lat').html('Latitude<br>' + lat.toFixed(3));
        $('#long').html('Longitude<br>' + long.toFixed(3));
        $('#day').html(data[0].LocalObservationDateTime.slice(0, 10));
        $('#hour').html(data[0].LocalObservationDateTime.slice(11, 19));
        $('#icon').attr('src', 'https://developer.accuweather.com/sites/default/files/' + icon + '-s.png');
        $('#temperature').html(data[0].Temperature.Metric.Value);
        $('#description').html(data[0].WeatherText);
        $('#humadity').html(data[0].RelativeHumidity);
        $('#wind').html(data[0].Wind.Speed.Metric.Value);
      }
    }
  }
}

// ////////////////////////////////
// functions
  function padToTwo(number) {
    if (number <= 99) { number = ('0' + number).slice(-2); }
    return number;
  }
  function loaderShow() {
    $('.overlay').show();
  }
  function loaderHide() {
    $('.overlay').fadeOut();
  }
  function error() {
    $('.error').show();
  }
});
