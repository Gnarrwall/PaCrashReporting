'use strict';

describe('Controller: SelectNumberOfCarsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var SelectNumberOfCarsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectNumberOfCarsCtrl = $controller('SelectNumberOfCarsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
