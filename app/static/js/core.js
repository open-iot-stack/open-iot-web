(function () {

  'use strict';

  var app = angular.module('BlackHoleApp', ['ngResource']);


app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

    app.factory('Token', ['$http', function ($http) {
  return {
    getToken: function (callback) {
      $http.get('/session').success( function (res) {
       callback(res)
      })
    }
  }
}])



      app. controller('WinkController', ['$scope', '$log', '$http', '$timeout','Token', function($scope, $log, $http,$timeout, Token) {
          $scope.getDevices = function () {
             // $log.log("test");
        $scope.token = null
        Token.getToken( function (res) {
           //  $log.log(res);
         $scope.token = res
         })
            var timeout = "";
              var urlBase ="https://winkapi.quirky.com";


              var poller = function () {
                  // fire the API request
                  $http({method: 'GET',
                  url:urlBase+'/users/me/wink_devices',
                  headers:{
                  Authorization : 'Bearer ' + $scope.token
                     }}).
                      success(function (results) {
                        //  $log.log(results);
                          $scope.devices = results.data;
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

            $scope.updateDeviceState = function (device_type, device_id) {
                 $scope.token = null
                Token.getToken( function (res) {
                //  $log.log(res);
                 $scope.token = res
                 })

                  $http({method: 'PUT',
                  url:urlBase+'/users/me/wink_devices/'+device_type+"/"+device_id,
                  headers:{
                  Authorization : 'Bearer ' + $scope.token
                     }}).
                      success(function (results) {
                        //  $log.log(results);
                        //$scope.devices = results.data;
                      }).
                      error(function (error) {
                          $log.log(error);
                      });
            }

      }

  ]);

}());