var FilterModule = (function (DataModule, BodyModule) {
  function filter() {
    // check if online, offline or all is clicked
    var mode = this.id;
    // get actual array with data
    var objectArray = DataModule.getObjectArray();
    // filter this array
    var filteredArray = objectArray.filter(function (stream) {
      // if all is cliced let all elements
      if (mode === 'all') {
        return true;
      }
      // if online or offline filter
      return stream.mode === mode;
    });
    // render by filtered mode
    BodyModule.resetBody();
    BodyModule.renderBody(filteredArray);
  }
  return {
    filter: filter
  };
})(DataModule, BodyModule);
