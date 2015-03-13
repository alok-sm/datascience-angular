'use strict';

angular.module('aspiringResearcherApp')
	.controller('TaskAssignCtrl', function ($scope) {
		// $http.post('/api/task/assign', {msg:'hello word!'})
		// 	.success(function(data, status, headers, config) {

		// 	})
		// 	.error(function(data, status, headers, config) {

		// 	});
		$scope.testResp = [
			{
				"taskId":"1", 
				"taskTitle":"Guess the Breed of the dog in the image",
				"taskType":"image",
				"taskData" : "https://raw.githubusercontent.com/5harad/crowds/master/data/tasks/dog_breeds/assets/dog1.jpg",
				"answerData" :["German Shepherd", "Labrador", "Pug", "Doberman"],
				"answerType":"radio"
			}, 
			{
				"taskId":"2",
				"taskTitle":"Guess the meaning of the word in the context",
				"taskType":"text",
				"taskData" : "In 1974, Poland won the World Cup, but the success turned out to be an *aberration*, and Poland have not won a World Cup since.",
				"answerData" : ["divergence","imperfection","heterogeneity","unorthodox","erro"],
				"answerType":"radio" 
			}, 
			{
				"taskId":"3",
				"taskTitle":"Predict the weight of the cow in kilos",
				"taskType":"image", 
				"taskData":"http://dreamatico.com/data_images/cow/cow-5.jpg",
				"answerType":"text" 
			},
			{
				"taskId":"4",
				"taskTitle":"What is the population of Brazil?",
				"taskType":"text", 
				"taskData" : "",
				"answerType":"text" 
			}
		]

		$scope.index = 0;
	});
