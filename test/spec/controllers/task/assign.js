'use strict';

describe('Controller: TaskAssignCtrl', function () {

  // load the controller's module
  beforeEach(module('aspiringResearcherApp'));

  var TaskAssignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskAssignCtrl = $controller('TaskAssignCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
