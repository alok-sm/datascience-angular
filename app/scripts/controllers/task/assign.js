'use strict';

angular.module('aspiringResearcherApp')
	.controller('TaskAssignCtrl', function ($scope) {
		// $http.post('/api/task/assign', {msg:'hello word!'})
		// 	.success(function(data, status, headers, config) {

		// 	})
		// 	.error(function(data, status, headers, config) {

		// 	});
		data = {
			"status":"SUCCESS", 
			"task":{
				"taskId":"some task id",
				"taskTitle":"some title", 
				"taskType":"text", 
				"taskData":"some task data", 
				"answerType":"text", 
				"answerData":"some answer data"
			}
		}

	});
