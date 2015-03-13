'use strict';
angular.module('aspiringResearcherApp')
	.directive('customtask', function () {
		return{
			restrict:'E',
			scope:{
			    question : "=data"
			},
			templateUrl : '../../directive_views/customtask.html'
		};
	});

