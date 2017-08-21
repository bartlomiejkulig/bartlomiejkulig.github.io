var AjaxModule = (function (BodyModule) {
  var apiKey = '?client_id=ky7lf42bjej2jqwucrksw329r50o4c';
  var urlStreams = 'https://api.twitch.tv/kraken/streams/';
  var urlChannels = 'https://api.twitch.tv/kraken/channels/';

  // set promise based on url
  function getData(url) {
    return new Promise(function (resolve, reject) {
      var xhttp = new XMLHttpRequest();
      xhttp.open('GET', url, true);
      xhttp.onload = function () {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.response));
        } else {
          reject(xhttp.statusText);
        }
      };
      xhttp.onerror = function () {
        reject(xhttp.statusText);
      };
      xhttp.send();
    });
  }

  // handle first api response, set object from stream constructor
  function handleFirstResponse(data, i, objectArray) {
    if (data.stream === null) {
      objectArray[i] = new BodyModule.Stream('offline', null, null, null);
    } else {
      objectArray[i] = new BodyModule.Stream('online', data.stream.average_fps, data.stream.viewers, data.stream.game);
    }
  }
  // handle second api response, set rest of extra values to obj
  function handleSecondResponse(data, i, objectArray) {
    objectArray[i].name = data.display_name;
    objectArray[i].link = data.url;
    objectArray[i].logo = data.logo;
    objectArray[i].banner = data.profile_banner;
    objectArray[i].status = data.status;
  }

  // summary function of base ajax request
  function downloadData(i, streamsArray, objectArray) {
    return getData(urlStreams + streamsArray[i] + apiKey)
    .then(function (data) {
      handleFirstResponse(data, i, objectArray);
      return getData(urlChannels + streamsArray[i] + apiKey);
    })
    .then(function (data) {
      handleSecondResponse(data, i, objectArray);
    });
  }

  // function for single data download
  function addSingleData(name, singleStream) {
    return getData(urlStreams + name + apiKey)
    .then(function (data) {
      console.log(data);
      if (data.stream === null) {
        singleStream = new BodyModule.Stream('offline', null, null, null);
      } else {
        singleStream = new BodyModule.Stream('online', data.stream.average_fps, data.stream.viewers, data.stream.game);
      }
      return getData(urlChannels + name + apiKey);
    })
    .then(function (data) {
      singleStream.name = data.display_name;
      singleStream.link = data.url;
      singleStream.logo = data.logo;
      singleStream.banner = data.profile_banner;
      singleStream.status = data.status;
      return singleStream;
    }).catch(function (error) {
      console.log(error);
    });
  }

  return {
    downloadData: downloadData,
    addSingleData: addSingleData
  };
})(BodyModule);
