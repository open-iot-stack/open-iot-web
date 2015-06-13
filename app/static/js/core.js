(function () {

  'use strict';
    var token;
  var app = angular.module('BlackHoleApp', ['ngResource']);
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

      app. controller('WinkController', ['$scope', '$log', '$http', '$timeout','Token', function($scope, $log, $http,$timeout, Token) {
          $scope.getDevices = function () {
              var urlBase = "https://winkapi.quirky.com";

              var poller = function () {

                  Token.getToken().then(
                      function (token) {

                          var timeout = "";
                          $http({
                              method: 'GET',
                              url: urlBase + '/users/me/wink_devices',
                              headers: {
                                  Authorization: 'Bearer ' + token
                              }
                          }).success(function (results) {
                              //  $log.log(results);
                              $scope.devices = results.data;
                          }).
                              error(function (error) {
                                  $log.log(error);
                              });
                          // continue to call the poller() function every 2 seconds
                          // until the timeout is cancelled
                          timeout = $timeout(poller, 2000);
                      });
              }


              poller();
          }


          $scope.getGroups = function(data){
              var urlBase = "https://winkapi.quirky.com";

               var groups = function () {
                   Token.getToken().then(
                   function(token){
                       var groupTimeout = "";
                       $http({
                        method: 'GET',
                        url:urlBase+'/users/me/groups',
                        headers:{
                            Authorization : 'Bearer ' + token
                        }
                       }).success(function (results) {
                   //  $log.log(results);
                             $scope.groups = results.data;
                       }).error(function (error) {
                             $log.log(error);
                       });
                   // continue to call the poller() function every 2 seconds
                   // until the timeout is cancelled
                   groupTimeout = $timeout(groups, 2000);
                   })
               }
               groups();

          }
            $scope.updateDeviceState = function (data) {
                 var urlBase ="https://winkapi.quirky.com";
                 //$scope.token = null
                Token.getToken( function (res) {
                //  $log.log(res);
                 $scope.token = res
                 })
                    if(data.desired_state.powered){
                        data.desired_state.powered = false;
                    } else { data.desired_state.powered = true;}

                  $http({method: 'PUT',
                  url:urlBase+'/'+'light_bulbs'+'/'+data.light_bulb_id,
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