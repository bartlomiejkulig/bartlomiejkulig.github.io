var DataModule = (function (AjaxModule, BodyModule, UIModule, AddModule) {
  var streamsArray;
  var objectArray = [];
  var promises = [];
  streamsArray = ['arroneagleheart', 'dreamhackcs', 'skyzhar', 'freecodecamp', 'faceittv', 'terakilobyte', 'robotcaleb', 'sheevergaming', 'esl_sc2', 'ogamingsc2', 'jacksofamerica'];

  // get promises based on basearray
  function setPromises(baseArray, targetArray) {
    for (var i = 0; i < streamsArray.length - 1; i++) {
      promises[i] = AjaxModule.downloadData(i, baseArray, targetArray);
    }
  }

  // use promises with a callback
  function useDataFromPromises(callback) {
    Promise.all(promises).then(callback);
  }

  // INIT DOWNLOADING DEFAULT DATA
  setPromises(streamsArray, objectArray);
  useDataFromPromises(function () {
    BodyModule.renderBody(objectArray);
    BodyModule.hideLoader();
  });

  function getObjectArray() {
    return objectArray;
  }

  function deleteStream(target) {
    DataModule.unsetStream(BodyModule.getStreamIndex(target));
    BodyModule.resetBody();
    var objectArray = DataModule.getObjectArray();
    BodyModule.renderBody(objectArray);
  }

  function refresh() {
    BodyModule.showLoader();
    BodyModule.resetBody();
    setPromises(getActualListOfNames(), objectArray);
    useDataFromPromises(function () {
      BodyModule.renderBody(objectArray);
      BodyModule.hideLoader();
    });
  }

  function getActualListOfNames() {
    var baseArray = getObjectArray();
    var array = baseArray.map(function (val) {
      return val.name.toLowerCase().replace(' ', '');
    });
    return array;
  }
  function setStream(stream) {
    objectArray.unshift(stream);
  }
  function unsetStream(index) {
    objectArray.splice(index, 1);
  }

  return {
    getObjectArray: getObjectArray,
    refresh: refresh,
    setStream: setStream,
    unsetStream: unsetStream,
    deleteStream: deleteStream
  };
})(AjaxModule, BodyModule, UIModule, AddModule);
