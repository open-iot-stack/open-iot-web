/**
 * Created by joshua on 6/28/15.
 */

'use strict';
angular.module('BlackHoleApp.Wink', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Wink', {
    templateUrl: 'static/view/lights.html',
    controller: 'WinkController'
  });
}])

app. controller('WinkController', ['$scope', '$log', '$http', '$timeout','Token', function($scope, $log, $http,$timeout, Token) {
          $scope.isOpen = false;
      $scope.demo = {
        isOpen: false,
        count: 0,
        selectedAlignment: 'md-left'
      }
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
                              $scope.prev_devices = angular.copy($scope.devices);
                              $scope.devices = results.data;
                          }).
                              error(function (error) {
                                  $log.log(error);
                              });
                          // continue to call the poller() function every 5 seconds
                          // until the timeout is cancelled
                          timeout = $timeout(poller, 5000);
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
                    var type="";
                    var id ="";
                if(data.model_name == 'Binary Switch'){
                    type="binary_switches";

                    id = data.binary_switch_id;
                }else{
                   type= "light_bulbs";
                    id = data.light_bulb_id;
                }
                  $http({method: 'PUT',
                  url:urlBase+'/'+type+'/'+id,
                      data: data,
                  headers:{
                  Authorization : 'Bearer ' + token
                     }}).
                      success(function (results) {
                        //  $log.log(results);
                        //$scope.devices = results.data;
                      }).
                      error(function (error) {
                          $log.log(error);
                      });
            }

          $scope.updateLight = function (data) {
               var urlBase ="https://winkapi.quirky.com";
               //$scope.token = null
              Token.getToken( function (res) {
              //  $log.log(res);
               $scope.token = res
               })

               var type= "light_bulbs";
               var id = data.light_bulb_id;

                $http({method: 'PUT',
                url:urlBase+'/'+type+'/'+id,
                    data: data,
                headers:{
                Authorization : 'Bearer ' + token
                   }}).
                    success(function (results) {
                      //  $log.log(results);
                      //$scope.devices = results.data;
                    }).
                    error(function (error) {
                        $log.log(error);
                    });
                  }
           $scope.updateGroupState = function (data) {
                 var urlBase ="https://winkapi.quirky.com";
                 //$scope.token = null
                Token.getToken( function (res) {
                //  $log.log(res);
                 $scope.token = res
                 })
                var post="";
                    if(data.reading_aggregation.powered.true_count!=0){
                       post ='{"desired_state": {"powered":false}}';
                    } else {  post ='{"desired_state": {"powered":true}}';}



                  $http({method: 'POST',
                  url:urlBase+'/groups/'+data.group_id+'/activate',
                      data: post,
                  headers:{
                  Authorization : 'Bearer ' + token
                     }}).
                      success(function (results) {
                        //  $log.log(results);
                        //$scope.devices = results.data;
                      }).
                      error(function (error) {
                          $log.log(error);
                      });
            }

          $scope.getGrillStats = function(data){
              var urlBase = "https://winkapi.quirky.com";


                   Token.getToken().then(
                   function(token){

                       $http({
                        method: 'GET',
                        url:urlBase+'/propane_tanks/'+ data.propane_tank_id +'/stats/?since='+ data.tank_changed_at +'&until='+ (new Date).getTime(),
                        headers:{
                            Authorization : 'Bearer ' + token
                        }
                       }).success(function (results) {
                            results.data.average_grill_time=convertToTime(results.data.average_grill_time);
                            results.data.average_tank_life_cumulative =convertToTime(results.data.average_tank_life_cumulative);
                            results.data.average_tank_life_real  =convertToTime(results.data.average_tank_life_real );

                             $scope.grill_stats = results.data;
                       }).error(function (error) {
                             $log.log(error);
                       });

                   })



          }

          $scope.getIcons = function(data){
              var urlBase = "https://winkapi.quirky.com";


                   Token.getToken().then(
                   function(token){

                       $http({
                        method: 'GET',
                        url:urlBase+'/icons/',
                        headers:{
                            Authorization : 'Bearer ' + token
                        }
                       }).success(function (results) {
                             $scope.icons = results.data;
                       }).error(function (error) {
                             $log.log(error);
                       });

                   })



          }

      }]
    );
