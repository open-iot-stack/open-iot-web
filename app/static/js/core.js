(function () {

  'use strict';

  var app = angular.module('BlackHoleApp', ['ngResource']);


app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

      app. controller('WinkController', ['$scope', '$log', '$http', '$timeout', function($scope, $log, $http,$timeout) {
          $scope.getResults = function () {
              $log.log("test");

            var timeout = "";
              var urlBase ="https://winkapi.quirky.com";
              // get the URL from the input
              var userInput = $scope.input_url;

              var poller = function () {
                  // fire the API request
                  $http.get(urlBase+'/users/me/wink_devices').
                      success(function (results) {
                          $log.log(results);
                          $scope.wordcounts = results;
                      }).
                      error(function (error) {
                          $log.log(error);
                      });
                   // continue to call the poller() function every 2 seconds
        // until the timeout is cancelled
        timeout = $timeout(poller, 2000);
              }
poller();
          }

      }

  ]);

}());