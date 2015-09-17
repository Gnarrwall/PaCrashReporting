'use strict';

describe('Controller: SpecifyLocationTypeCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var SpecifyLocationTypeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecifyLocationTypeCtrl = $controller('SpecifyLocationTypeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
