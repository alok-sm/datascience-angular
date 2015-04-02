'use strict';

angular.module('aspiringResearcherApp')
.controller('TaskAssignCtrl', function ($scope, $http, $interval, $location, $sce, api, debug) {
	// bootbox.alert("hello");
	function setQuestion(){
		$http.get(api.url + "/tasks?token=" + localStorage.getItem('token'))
	 	.success(function(response){
	 		bootbox.hideAll()
	 		debug.log(response);

			$scope.isQuestion = false;
			$scope.isConfidence = false;

			if('domain' in response && response['status'] == 'success'){
				if(response.type == "0"){
					$scope.prepercentile  = true;
					$scope.postpercentile = false;
				}else{
					$scope.prepercentile  = false;
					$scope.postpercentile = true;
				}
				debug.log(" if");
				$scope.isConfidence = true;
				$scope.domain = response.domain;
				$scope.confidence = 50;
				$scope.submit = function(){
					bootbox.dialog({
						title: "Loading",
						message: '<center><img src="../../../loading.gif" width="100px"/></center>'
					});

					$http.post(api.url + "/answers", {
						"token"     : localStorage.getItem('token'),
						"domain_id" : response['domain']['id'],
						"rank"      : 5
					})
					.success(function(response){
						debug.log("confidence sent");
						$scope.submit = null;
						setQuestion();
					});
				};

			}else if(response['status'] == 'success'){
				$scope.time_remaining = 30;
				$scope.timer = $interval(function(){
					debug.log("hello" + $scope.time_remaining)
					$scope.time_remaining--;
					if($scope.time_remaining == 10){
						$scope.time_remaining_danger = true;
					}
					if($scope.time_remaining == 0){
						debug.log({
							"token"      : localStorage.getItem('token'),
							"time_taken" : 30,
							"confidence" : 0,
							"data"       : "timeout",
							"task_id"    : $scope.question.task.id
						});

						$interval.cancel($scope.timer)
						$scope.time_remaining_danger = false;
						bootbox.dialog({
							title: "Loading",
							message: '<center><img src="../../../loading.gif" width="100px"/></center>'
						});

						$http.post(api.url + "/answers", {
							"token"      : localStorage.getItem('token'),
							"time_taken" : 30,
							"confidence" : 0,
							"data"       : "timeout",
							"task_id"    : $scope.question.task.id
						})
						.success(function(response){
							$scope.submit = null;
							setQuestion();
						});
					}
				}, 1000);
				$scope.isQuestion = true;
				$scope.question = response;
				$scope.question.confidence = 3;


				$scope.getURL = function(x){
		            return $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+x+'&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true');
		        };
		        if($scope.question.task.type=="audio"){
		        	$scope.question.task.data=$scope.getURL($scope.question.task.data);
		        }

				$scope.submit = function(){
					$interval.cancel($scope.timer)
					debug.log({
						"token"      : localStorage.getItem('token'),
						"time_taken" : 30 - $scope.time_remaining,
						"confidence" : $scope.question.confidence,
						"data"       : $scope.question.name,
						"task_id"    : $scope.question.task.id
					})
					bootbox.dialog({
						title: "Loading",
						message: '<center><img src="../../../loading.gif" width="100px"/></center>'
					});

					$http.post(api.url + "/answers", {
						"token"      : localStorage.getItem('token'),
						"time_taken" : 30 - $scope.time_remaining,
						"confidence" : $scope.question.confidence,
						"data"       : $scope.question.name,
						"task_id"    : $scope.question.task.id
					})
					.success(function(response){
						$scope.submit = null;
						setQuestion();
					});
					// bootbox.alert("hello1")
				};
			}else if(response['status'] == 'done'){
				debug.log("done!");
				$location.path("/task/done");
			}else{
				debug.log("API error!");
			}
		});
	}
	bootbox.dialog({
		title: "Loading",
		message: '<center><img src="../../../loading.gif" width="100px"/></center>'
	});
	setQuestion();
});
