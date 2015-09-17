'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SpecifyLocationTypeCtrl
 * @description
 * # SpecifyLocationTypeCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SpecifyLocationTypeCtrl', function (

        $scope,
        $location

      ) {



        $scope.inputNameValue = '';
        $scope.buttonText = 'Next';


        $scope.setLocationManually = function(clickEvent) {

           
          $location.path('/create/typeOfCrash');


        //  $location.path('/create/specify-manually');


        };


      $scope.setLocationAutomatically = function(clickEvent) {

        // $location.path('/create/specify_location');


      };



      });
