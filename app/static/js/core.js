(function () {

  'use strict';

  var app = angular.module('BlackHoleApp', ['ngResource']);




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

            $scope.updateDeviceState = function (data) {
                 var urlBase ="https://winkapi.quirky.com";
                 $scope.token = null
                Token.getToken( function (res) {
                //  $log.log(res);
                 $scope.token = res
                 })
                    if(data.desired_state.powered){
                        data.desired_state.powered = false;
                    } else { data.desired_state.powered = true;}

                  $http({method: 'PUT',
                  url:urlBase+'/users/me/wink_devices/'+'light_bulb'+"/"+data.light_bulb_id,
                      data: data,
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