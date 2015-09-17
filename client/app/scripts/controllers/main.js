'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MainCtrl', function (

  $scope

  ) {

    


    //-----Change Highlighting of Top Bar----------------H1

       var listElements = document.getElementsByTagName('li');

       var mainBar = angular.element(listElements[0]);
       var createBar = angular.element(listElements[1]);
       var curateBar = angular.element(listElements[2]);



       mainBar.addClass('active');
       curateBar.removeClass('active');
       createBar.removeClass('active');

    //---------------------------------------------------H1




  });
