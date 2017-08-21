var AddModule = (function (BodyModule, DataModule, AjaxModule, UIModule) {
  function addStream() {
    BodyModule.showLoader();
    BodyModule.resetBody();
    var singleStream;
    var name = UIModule.inputNewStream.value;
    AjaxModule.addSingleData(name, singleStream).then(function (data) {
      if (data) {
        singleDataSuccess(data);
      } else {
        singleDataError();
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  function singleDataSuccess(data) {
    UIModule.inputNewStream.value = '';
    DataModule.setStream(data);
    var objectArray = DataModule.getObjectArray();
    BodyModule.renderBody(objectArray);
    BodyModule.hideLoader();
  }

  function singleDataError() {
    UIModule.inputNewStream.value = '';
    alert('nie ma takiego strima');
    BodyModule.hideLoader();
    var objectArray = DataModule.getObjectArray();
    BodyModule.renderBody(objectArray);
  }
  return {
    addStream: addStream
  };
})(BodyModule, DataModule, AjaxModule, UIModule);
