'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MoviesCtrl', function ($scope, Movie) {


    //-----Change Highlighting of Top Bar----------------H1

       var listElements = document.getElementsByTagName('li');

       var mainBar = angular.element(listElements[0]);
       var createBar = angular.element(listElements[1]);
       var curateBar = angular.element(listElements[2]);



       mainBar.removeClass('active');
       curateBar.addClass('active');
       createBar.removeClass('active');

    //---------------------------------------------------H1

    $scope.movies = Movie.getList().$object;

  });
