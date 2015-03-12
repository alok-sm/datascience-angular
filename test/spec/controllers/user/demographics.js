'use strict';

describe('Controller: UserDemographicsCtrl', function () {

  // load the controller's module
  beforeEach(module('aspiringResearcherApp'));

  var UserDemographicsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDemographicsCtrl = $controller('UserDemographicsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
