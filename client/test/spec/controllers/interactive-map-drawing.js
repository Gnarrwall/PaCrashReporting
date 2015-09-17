'use strict';

describe('Controller: InteractiveMapDrawingCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var InteractiveMapDrawingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InteractiveMapDrawingCtrl = $controller('InteractiveMapDrawingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
