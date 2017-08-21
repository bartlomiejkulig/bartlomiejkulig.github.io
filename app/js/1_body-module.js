var BodyModule = (function (AjaxModule, UIModule) {
  // contructor of streams
  function Stream(mode, fps, viewers, game) {
    this.mode = mode;
    this.fps = fps;
    this.viewers = viewers;
    this.game = game;
  }

  // get name of stream
  function getStreamIndex(clickedElement) {
    var streamToRemove = clickedElement.parentElement.parentElement;
    var currentStreamList = UIModule.wrapper.children;
    var index = Array.prototype.indexOf.call(currentStreamList, streamToRemove);
    return index;
  }

  function hideLoader() {
    UIModule.loader.style.display = 'none';
  }

  function showLoader() {
    UIModule.loader.style.display = 'block';
  }

  // reset appended streams to body
  function resetBody() {
    UIModule.wrapper.innerHTML = '';
  }

  // render streams to body
  function renderBody(objectArray) {
    objectArray.forEach(function (obj) {
      // set stream container
      var stream = document.createElement('div');
      stream.className = 'streams__stream stream';
      // set logo
      var logoContainer = document.createElement('div');
      var logo = document.createElement('img');
      logoContainer.className = 'stream__logo';
      logo.className = 'stream__image';
      if (obj.logo === null) {
        var logoBackup = 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png';
        logo.src = logoBackup;
      } else {
        logo.src = obj.logo;
      }
      logoContainer.appendChild(logo);
      stream.appendChild(logoContainer);
      // set description
      var descriptionContainer = document.createElement('div');
      descriptionContainer.className = 'stream__description';
      stream.appendChild(descriptionContainer);
      // set delete
      var deleteContainer = document.createElement('div');
      deleteContainer.className = 'stream__delete';
      stream.appendChild(deleteContainer);
      // set delete button
      var deleteButton = document.createElement('button');
      deleteButton.className = 'stream__button';
      deleteButton.innerText = 'X';
      deleteContainer.appendChild(deleteButton);
      // set streamtext
      var streamText = document.createElement('p');
      streamText.className = 'stream__text';
      descriptionContainer.appendChild(streamText);
      var link = document.createElement('a');
      link.href = obj.link;
      link.innerText = obj.name;
      streamText.appendChild(link);
      // check if online
      if (obj.mode === 'online') {
        stream.className += ' online';
        streamText.innerHTML += '<br> is currently streaming ' + obj.game;
        // set stream status
        var status = document.createElement('p');
        status.className = 'stream__status';
        status.innerText = obj.status;
        descriptionContainer.appendChild(status);
        // set stream status
        var stats = document.createElement('p');
        stats.className = 'stream__info';
        stats.innerHTML = 'Viewers: ' + obj.viewers + ' Average FPS: ' + obj.fps.toFixed(0);
        descriptionContainer.appendChild(stats);
      } else {
        stream.className += ' offline';
        streamText.innerHTML += '<br> is currently offline';
      }
      // set stream to wrapper
      UIModule.wrapper.appendChild(stream);
    });
  }

  return {
    Stream: Stream,
    renderBody: renderBody,
    resetBody: resetBody,
    hideLoader: hideLoader,
    showLoader: showLoader,
    getStreamIndex: getStreamIndex
  };
})(AjaxModule, UIModule);
