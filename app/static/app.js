/**
 * Created by joshua on 6/28/15.
 */
'use strict';
var app = angular.module('BlackHoleApp', ['ngResource','ngMaterial', 'BlackHoleApp.Wink']).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/Wink'});
    }]);
    var token;

    app.factory('Token', function ($http,$q) {
    return {
    getToken: function () {
        if ( angular.isDefined( token ) ) return $q.when( token );


      return $http.get('/session').then(function(payload){
         token = payload.data;
          return token;
          })
    }
  }
})