'use strict';

angular.module('aspiringResearcherApp')
.controller('TaskAssignCtrl', function($scope, $http, $interval, $location, $sce, api, debug){
	function setQuestion(){
		$http.get(api.url + "/tasks?token=" + localStorage.getItem('token'))
	 	.success(function(response){
	 		bootbox.hideAll();
	 		debug.log(response);

			$scope.isQuestion = false;
			$scope.isConfidence = false;

			if('domain' in response && response['status'] == 'success'){
				if(response.type == "0"){
					$scope.prepercentile  = true;
					$scope.postpercentile = false;
					localStorage.setItem('remaining', response['remaining'])
				}else{
					$scope.prepercentile  = false;
					$scope.postpercentile = true;
				}
				debug.log(" if");
				$scope.isConfidence = true;
				$scope.domain = response.domain;
				// $scope.confidence = 50;
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
					})
					.error(function(response){
						bootbox.alert("Sorry, We've had an unexpected error. Please try again later :)")
					});
				};

			}else if(response['status'] == 'success'){
				$scope.time_remaining        = 30;
				$scope.time_remaining_danger = false;

				$scope.timer_event = function(){
					$scope.timer  = $interval(function(){
						$scope.time_remaining--;
						if($scope.time_remaining == 10){
							$scope.time_remaining_danger = true;
						}
						if($scope.time_remaining == 0){

							var req_params = {
								"token"      : localStorage.getItem('token'),
								"time_taken" : 30,
								"confidence" : 0,
								"data"       : "timeout",
								"task_id"    : $scope.question.task.id
							}

							debug.log(req_params);

							$interval.cancel($scope.timer)
							bootbox.dialog({
								title: "Loading",
								message: '<center><img src="../../../loading.gif" width="100px"/></center>'
							});

							$http.post(api.url + "/answers", req_params)
							.success(function(response){
								$scope.submit = null;
								bootbox.hideAll();
								bootbox.alert("Your time is up. Please Answer the question within the timer. Click \"OK\" to continue", setQuestion);
							})
							.error(function(response){
								bootbox.alert("Sorry, We've had an unexpected error. Please try again later :)")
							});
						}
					}, 1000);
				}
				$scope.isQuestion = true;
				var testResp      = [
					{
						"status"    : "success", 
						"remaining" : 12, 
						"stats"     : ["100", "130", "120", "233", "100"],
						"task"      : {                                
							"id"          : 3, 
							"title"       : "title of the task", 
							"type"        : "image", 
							"data"        : "http://i.i.cbsi.com/cnwk.1d/i/tim/2013/02/20/football_620x350.jpg", 
							"answer_type" : "mcq", 
							"answer_data" : "1,2,3,4,5"
						},
					}, 
					{
						"status"                 : "success",
						"remaining"              : 12, 
						"experimental_condition" : 4,
						"stats"                  : ["100", "130", "120", "233", "100"],
						"task": 
						{
							"id"          : 3, 
							"title"       : "title of the task", 
							"type"        : "video", 
							"data"        : "cRSQ9vB-hxk", 
							"answer_type" : "mcq", 
							"answer_data" : "1,2,3,4,5"
						}
					}, 
					{
						"status"                 : "success", 
						"remaining"              : 12, 
						"experimental_condition" : 4,
						"stats"                  : ['100', '130', '120', '233', '100'],
						"task": {
							"id"          : 3, 
							"title"       : "title of the task", 
							"type"        : "audio", 
							"data"        : 164760832, 
							"answer_type" : "mcq", 
							"answer_data" : "1,2,3,4,5"
						}
					},
					{
						"status"    : "success", 
						"remaining" : 12, 
						"stats"     : ["100", "130", "120", "233", "100"],
						"task"      : {                                
							"id"          : 3, 
							"title"       : "title of the task", 
							"type"        : "text", 
							"data"        : "http://i.i.cbsi.com/cnwk.1d/i/tim/2013/02/20/football_620x350.jpg", 
							"answer_type" : "mcq", 
							"answer_data" : "1,2,3,4,5"
						},
					}
				]
				// var id = 1 + Math.round(Math.random())
				// $scope.question = testResp[id]
				// $scope.question = response;
				$scope.question = testResp[0]

				if($scope.question.task.type == "text" || $scope.question.task.type == "image"){
		        	$scope.timer_event()
		        }
		        if($scope.question.task.type == "video"){
		        	$scope.question.task.data = $sce.trustAsResourceUrl('ytplayer.html?'+$scope.question.task.data);
		        }
		        if($scope.question.task.type == "audio"){
		        	$scope.question.task.data = $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+$scope.question.task.data+'&amp;auto_play=true&amp;show_artwork=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true');
		        }
				$scope.progress_bar_style = "width:"+parseInt((localStorage.getItem('remaining') - response['remaining'])/localStorage.getItem('remaining') * 100)+"%";
				$scope.progress_text      = "Tasks Remaining in the domain:\n"+response['remaining']+" / "+localStorage.getItem('remaining')



				if($scope.question.experimental_condition){
					$scope.divstyle1 = "col-md-6 portfolio-item"
					$scope.divstyle2 = "col-md-3 portfolio-item"
				}else{

					$scope.divstyle1 = "col-md-7 portfolio-item"
					$scope.divstyle2 = "col-md-5 portfolio-item"
				}
				
				$scope.submit = function(){
					$scope.invalid_confidence = typeof $scope.question.confidence === 'undefined';
					$scope.invalid_answer = typeof $scope.question.name === 'undefined';

					if(!($scope.invalid_confidence || $scope.invalid_answer)){

						$interval.cancel($scope.timer)
						var req_params = {
							"token"      : localStorage.getItem('token'),
							"time_taken" : 30 - $scope.time_remaining,
							"confidence" : $scope.question.confidence,
							"data"       : $scope.question.name,
							"task_id"    : $scope.question.task.id
						}
						debug.log(req_params)
						bootbox.dialog({
							title: "Loading",
							message: '<center><img src="../../../loading.gif" width="100px"/></center>'
						});

						$http.post(api.url + "/answers", req_params)
						.success(function(response){
							$scope.submit = null;
							setQuestion();
						});
					}
					// bootbox.alert("hello1")
				};
			}else if(response['status'] == 'done'){
				debug.log("done!");
				$location.path("/task/done");
			}else{
				bootbox.alert("Sorry, We've had an unexpected error. Please try again later :)")
			}
		})
		.error(function(response){
			bootbox.alert("Sorry, We've had an unexpected error. Please try again later :)")
		});
	}
	bootbox.dialog({
		title: "Loading...",
		message: '<center><img src="../../../loading.gif" width="100px"/></center>'
	});
	setQuestion();
});
