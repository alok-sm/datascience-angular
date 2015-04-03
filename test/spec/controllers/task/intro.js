'use strict';

describe('Controller: TaskIntroCtrl', function () {

  // load the controller's module
  beforeEach(module('aspiringResearcherApp'));

  var TaskIntroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskIntroCtrl = $controller('TaskIntroCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
