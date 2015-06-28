/**
 * Created by joshua on 6/28/15.
 */
angular.module('BlackHoleApp.Robots', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Robots', {
    templateUrl: 'static/view/Robots.html',
    controller: 'RobotsController'
  });
}])
app. controller('RobotsController', ['$scope', '$log', '$http', '$timeout','Token', function($scope, $log, $http,$timeout, Token) {
$scope.getRobots = function(data){
              var urlBase = "https://winkapi.quirky.com";

               var robots = function () {
                   Token.getToken().then(
                   function(token){
                       var botTimeout = "";
                       $http({
                        method: 'GET',
                        url:urlBase+'/users/me/robots',
                        headers:{
                            Authorization : 'Bearer ' + token
                        }
                       }).success(function (results) {
                   //  $log.log(results);
                             $scope.robots = results.data;
                       }).error(function (error) {
                             $log.log(error);
                       });
                   // continue to call the poller() function every 2 seconds
                   // until the timeout is cancelled
                   botTimeout = $timeout(robots, 2000);
                   })
               }
               robots();

          }
}]);