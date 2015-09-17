'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SelectNumberOfCarsCtrl
 * @description
 * # SelectNumberOfCarsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SelectNumberOfCarsCtrl', function (

    $scope,
    $location,
    $rootScope

    ) {




    $rootScope.tcd = 'Select a TCD';
    $rootScope.tcdFunction = 'Select TCD Function';
    $rootScope.timeLaneClosed = 'Select Time Lane Closed';
    $rootScope.typeOfLaneClosed = 'Was the Lane Closed?';
    $rootScope.wasTrafficDetoured = 'Was Traffic Detoured?';
    $rootScope.directionOfLaneClosure = 'Lane Closure Direction';






    $rootScope.numberOfInjuries = '';
    $rootScope.numberOfDeaths = '';
    $rootScope.numberOfCars = '';
    $rootScope.numberOfPeople = '';

    $rootScope.workZoneRelated = false;
    $rootScope.schoolBusRelated = false;
    $rootScope.schoolZoneRelated = false;
    $rootScope.notifyPenndot = false;





    $scope.tcdArray = ['Not Applicable','Flashing Traffic Signal','Traffic Signal','Stop Sign',
                    'Yield Sign','Active RR Crossing','Passive RR Crossing Controls','Police Officer or Flagman',
                    'Other Type TCD','Unknown'];

    $scope.tcdFunctionsArray = ['No Controls','Device Not Functioning','Device Functioning Improperly','Device Functioning Properly','Emergency Signal',
                             'Unknown'];

    $scope.timeClosed = ['< 30 Min.','30-60 Min.','1-3 Hrs.','3-6 Hrs.','6-9 Hrs.','> 9 Hrs.', 'Unknown'];

    $scope.laneClosedType = ['Not Applicable','Partially','Fully','Unknown'];

    $scope.trafficDetoured = ["Yes", "No", "Unknown"];

    $scope.laneClosureDirection = ['North','South','East','West','North and South','East and West', 'All'];


    $scope.doneWithNumbers = false;
    $scope.doneWithBooleans = true;
    $scope.displayErrorMessage = false;
    $scope.showContinueButton = false;
    $scope.doneWithSelects = true;


    $scope.numberOfCurrent = '';
    $scope.outputMessage = '';
    $scope.questionMessage = 'How many cars were involved?';
    var count = 0;

    $scope.numberWasPressed = function(number) {


       if(isNaN(number)) {

         $scope.outputMessage = 'Please Input a Number';

       } else {

       switch(count) {

       case 0:
       $rootScope.numberOfCars = number;
       $scope.numberOfCurrent = '';
       $scope.questionMessage = 'How many people were involved?';
       count++;


       break;


       case 1:
       $rootScope.numberOfPeople = number;
       $scope.numberOfCurrent = '';
       $scope.questionMessage = 'How many people were injured?';
       count++;

       break;


       case 2:
       $rootScope.numberOfInjuries = number;
       $scope.numberOfCurrent = '';
       $scope.questionMessage = 'How many people were killed?';
       count++;
       break;

       case 3:
       $rootScope.numberOfDeaths = number;
       $scope.questionMessage = 'Was this crash work zone related?';
       $scope.doneWithNumbers = true;
       $scope.doneWithBooleans = false;
       count++;
       break;


       default:

       break;


      }

       }

    };




$scope.booleanWasPressed = function(yesButton) {


switch(count) {

  case 4:
  $scope.questionMessage = 'Was this crash school bus related?';
  $rootScope.workZoneRelated = yesButton;
  count++;
  break;

  case 5:
  $scope.questionMessage = 'Was this crash school zone related?';
  $rootScope.schoolBusRelated = yesButton;
  count++;
  break;


  case 6:
  $scope.questionMessage = 'Was penndot maintenence notified?';
  $rootScope.schoolZoneRelated = yesButton;
  count++;
  break;

  case 7:
  $scope.questionMessage = 'Just a few more things...';
  $scope.doneWithBooleans = true;
  $scope.doneWithSelects = false;
  $rootScope.notifyPenndot = yesButton;
  $scope.showContinueButton = true;
  break;


}



};


$scope.allSet = [false, false, false, false, false, false];

$scope.setTcd = function(num) {

  $rootScope.tcd = $scope.tcdArray[num];
  $scope.allSet[0] = true;

};

$scope.setTcdFunction = function(num) {

  $rootScope.tcdFunction = $scope.tcdFunctionsArray[num];
  $scope.allSet[1] = true;

};

$scope.setTimeClosed = function(num) {

  $rootScope.timeLaneClosed = $scope.timeClosed[num];
  $scope.allSet[2] = true;

};

$scope.setLaneClosedType = function(num) {

  $rootScope.typeOfLaneClosed = $scope.laneClosedType[num];
  $scope.allSet[3] = true;

};

$scope.setTrafficDetoured = function(num) {

  $rootScope.wasTrafficDetoured = $scope.trafficDetoured[num];
  $scope.allSet[4] = true;

};

$scope.setLaneClosureDirection = function(num) {

  $rootScope.directionOfLaneClosure = $scope.laneClosureDirection[num];
  $scope.allSet[5] = true;

};


$scope.continueButton = function() {



  for(var i = 0; i < $scope.allSet.length; i++) {

    if($scope.allSet[i] == false) {

      $scope.displayErrorMessage = true;

      return;

    }
  }


  $location.path('/create/inputDriverInfo');


};




  });
