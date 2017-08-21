var EventModule = (function (FilterModule, DataModule, BodyModule, UIModule, AjaxModule, AddModule) {

  // event listeners;
  UIModule.all.addEventListener('click', FilterModule.filter);
  UIModule.offline.addEventListener('click', FilterModule.filter);
  UIModule.online.addEventListener('click', FilterModule.filter);
  UIModule.refresh.addEventListener('click', DataModule.refresh);
  UIModule.submitNewStream.addEventListener('click', AddModule.addStream);
  UIModule.wrapper.addEventListener('click', function (e) {
    if (e.target.matches('button')) {
      DataModule.deleteStream(e.target);
    }
  });


})(FilterModule, DataModule, BodyModule, UIModule, AjaxModule, AddModule);
