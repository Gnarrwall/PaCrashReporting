'use strict';

describe('Controller: ProvideWrittenReportCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ProvideWrittenReportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProvideWrittenReportCtrl = $controller('ProvideWrittenReportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
