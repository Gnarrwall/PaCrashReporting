'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TypeOfCrashCtrl
 * @description
 * # TypeOfCrashCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TypeOfCrashCtrl', function (

    $scope,
    $rootScope,
    $location


    ) {

$scope.selected = false;
$scope.typeOfCrash = "Action";
$rootScope.crashType = '';


$scope.setType = function(key) {

  var ref = ['Midblock', '4 Way Intersection', '"T" Intersection', '"Y" Intersection', 'Traffic Circle', 'Multi-Leg Intersection',
             'On Ramp', 'Off Ramp', 'Rainroad Crossing', 'Other'];

  $scope.selected = true;
  $scope.typeOfCrash = ref[key];

  if(key == 0) {    //0 Means put the map into midblock mode
                    //1 Means put the map into intersection mode
                    //2 Means other mode (1 point)
    $rootScope.crashType = 0;
  } else if (key == 1 || key == 2 || key == 3 || key == 4) {

    $rootScope.crashType = 1;
  } else {

    $rootScope.crashType = 2;
  }

};

$scope.continue = function() {


  $location.path('/create/specify-manually');


};






  });
