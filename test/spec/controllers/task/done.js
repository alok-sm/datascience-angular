'use strict';

describe('Controller: TaskDoneCtrl', function () {

  // load the controller's module
  beforeEach(module('aspiringResearcherApp'));

  var TaskDoneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskDoneCtrl = $controller('TaskDoneCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
