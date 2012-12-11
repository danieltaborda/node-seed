'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
  value('version', '0.1')
  .factory('ResultsPartiesByRegions', function($resource){
  return $resource('http://ecommentatorapi.com/search/year/:year/type/:type/id/:id/callback/:callback/',
        {year:'2012',type:'EA',id:'',callback:'JSON_CALLBACK'},
        {get:{method:'JSONP'}});
});
