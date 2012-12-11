'use strict';

/* Controllers */

function AppCtrl($scope, $http, ResultsPartiesByRegions) {

	$scope.list = ResultsPartiesByRegions.get();
	$scope.content = {};
	$scope.routeOpen = {};
	$scope.buttonClass = {};
	$scope.loading = {};

	var countColorReserve = 0;
	//partiesColors  arrays will be outside in a json config file
	var partiesColors = [{name:'PPdeG',style:{'background-color':'rgb(0,130,210)'}},
							 {name:'PSdeG',style:{'background-color':'rgb(237,28,36)'}},
							 {name:'BNG',style:{'background-color':'rgb(240,125,0)'}},
							 {name:'AGE',style:{'background-color':'rgb(118,210,250)'}, invert:true},
							 {name:'CxG',style:{'background-color':'rgb(47,176,45)'}},
							 {name:'UPyD',style:{'background-color':'rgb(251,66,148)'}},
							 {name:'SCD',style:{'background-color':'rgb(255,201,0)'}, invert:true},
							 ];
	var reserveColors =  [{color :'rgb(155,170,224)'},{color:'rgb(240,205,220)',invert:true},{color:'rgb(159,255,174)',invert:true},
						 {color:'rgb(255,95,181)'},{color:'rgb(184,112,255)'}, {color:'rgb(102,63,255)'},
						 {color:'rgb(223,216,0)',invert:true},{color:'rgb(0,102,102)'},{color:'rgb(102,51,0)'},{color:'rgb(102,153,102)'},
						 {color:'rgb(122,0,245)'},{color:'rgb(102,102,0)'}];								 

	$scope.findRegion = function(regionId,index) {
		var key = regionId+"|"+index;
		return ($scope.routeOpen[key]) ? true : false ;
	};
	$scope.loadContent = function(regionId,index) {
		var key = regionId+"|"+index;
		var result =  ($scope.routeOpen[key]) ? true : false ;
		$scope.loading[key] = "Loading...";
		if(result){
			delete $scope.routeOpen[key] ;
			//delete $scope.content[key] ;
			$scope.buttonClass[key] = "";
		}else
		{
			if(!$scope.content[key])
			{
				$scope.content[key]= ResultsPartiesByRegions.get({id:regionId},function() {
					$scope.loading[key] = "";
					}, function(response, getResponseHeaders) {
					    //404 or bad
					    if(response.status === 404){
					    	$scope.loading[key] = "Error Loading";
					    }
					});
			}else{$scope.loading[key] = "";}
			$scope.routeOpen[key] =  regionId ;
			$scope.buttonClass[key] = "btn-success";
		}
	};
	$scope.getClosedColor = function(closedPerc){
		if(closedPerc <30){return "btn-danger";}
		if(closedPerc >30 && closedPerc < 50){return "btn-info";}
		if(closedPerc > 50){return "btn-primary";}
	};
	$scope.getPartyColor = function(name){				
		var result = "";  				
		angular.forEach(partiesColors, function(value, key){
		  if(name == value.name){
		  	if(value.invert){value.style['color'] = '#000'; value.style['text-shadow'] = '0 -1px 0 rgba(255, 255, 255, 0.25)';}
		  	result = value.style;
		  }
		});
		//if the color is on the partiecolor list
		if(result){return result;}else//if not asign a new reserve color
		{
			if(reserveColors[countColorReserve])
			{
				var temp = {'background-color':reserveColors[countColorReserve].color};
				if(reserveColors[countColorReserve].invert){
					temp['color'] = '#000';
					temp['text-shadow'] = '0 -1px 0 rgba(255, 255, 255, 0.25)';
				}
				//console.log(name+"-----"+temp['background-color']);
				partiesColors.push({name:name,style:temp});
				countColorReserve ++ ;
				return temp;
			}
		}
	};
}

function HomeCtrl() {}
HomeCtrl.$inject = [];
