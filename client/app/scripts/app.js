'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'uiGmapgoogle-maps',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider,uiGmapGoogleMapApiProvider) {


//  uiGmapGoogleMapApiProvider.configure({

//  key: 'AIzaSyCaKR_0tZUJVP7KSnIN5DFf-rR3aPXozJU',
//  v: '3.17',
//  libraries: 'weather,geometry,visualization,places'

// });

  RestangularProvider.setBaseUrl('http://localhost:3000');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
      })
      .when('/create/movie', {
        templateUrl: 'views/movie-add.html',
        controller: 'MovieAddCtrl'
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie-view.html',
        controller: 'MovieViewCtrl'
      })
      .when('/movie/:id/delete', {
        templateUrl: 'views/movie-delete.html',
        controller: 'MovieDeleteCtrl'
      })
      .when('/movie/:id/edit', {
        templateUrl: 'views/movie-edit.html',
        controller: 'MovieEditCtrl'
      })
      .when('/create/specify_location', {
        templateUrl: 'views/specify-location-type.html',
        controller: 'SpecifyLocationTypeCtrl'
      })
      .when('/create/specify-manually', {
        templateUrl: 'views/manual-location-entry.html',
        controller: 'ManualLocationEntryCtrl'
      })
      .when('/create/selectNumberOfCars', {
        templateUrl: 'views/select-number-of-cars.html',
        controller: 'SelectNumberOfCarsCtrl'
      })
      .when('/create/inputDriverInfo', {
        templateUrl: 'views/input-driver-info.html',
        controller: 'InputDriverInfoCtrl'
      })
      .when('/create/sketchMap', {
        templateUrl: 'views/interactive-map-drawing.html',
        controller: 'InteractiveMapDrawingCtrl'
      })
      .when('/create/provideWrittenReport', {
        templateUrl: 'views/provide-written-report.html',
        controller: 'ProvideWrittenReportCtrl'
      })
      .when('/create/typeOfCrash', {
        templateUrl: 'views/type-of-crash.html',
        controller: 'TypeOfCrashCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })



.factory('MovieRestangular', function(Restangular) {


    return Restangular.withConfig(function(RestangularConfigurer){

      RestangularConfigurer.setRestangularFields({

        id: '_id'
      });
    });
  })


.factory('Movie', function(MovieRestangular){

  return MovieRestangular.service('movie');

});
