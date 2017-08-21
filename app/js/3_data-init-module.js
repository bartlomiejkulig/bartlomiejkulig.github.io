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

  // get actual list of strems
  function getObjectArray() {
    return objectArray;
  }

  // remove stream form list of streams
  function deleteStream(target) {
    DataModule.unsetStream(BodyModule.getStreamIndex(target));
    BodyModule.resetBody();
    var objectArray = DataModule.getObjectArray();
    BodyModule.renderBody(objectArray);
  }

  // refresh actual list of streams
  function refresh() {
    BodyModule.showLoader();
    BodyModule.resetBody();
    setPromises(getActualListOfNames(), objectArray);
    useDataFromPromises(function () {
      BodyModule.renderBody(objectArray);
      BodyModule.hideLoader();
    });
  }

  // get acutal list of strims
  function getActualListOfNames() {
    var baseArray = getObjectArray();
    var array = baseArray.map(function (val) {
      return val.name.toLowerCase().replace(' ', '');
    });
    return array;
  }

  // set stream to begging of array
  function setStream(stream) {
    objectArray.unshift(stream);
  }
  // delete stream based on index
  function unsetStream(index) {
    objectArray.splice(index, 1);
  }

  // INIT DOWNLOADING DEFAULT DATA
  setPromises(streamsArray, objectArray);
  useDataFromPromises(function () {
    BodyModule.renderBody(objectArray);
    BodyModule.hideLoader();
  });

  return {
    getObjectArray: getObjectArray,
    refresh: refresh,
    setStream: setStream,
    unsetStream: unsetStream,
    deleteStream: deleteStream
  };
})(AjaxModule, BodyModule, UIModule, AddModule);
