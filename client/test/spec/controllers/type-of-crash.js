'use strict';

describe('Controller: TypeOfCrashCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var TypeOfCrashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TypeOfCrashCtrl = $controller('TypeOfCrashCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
