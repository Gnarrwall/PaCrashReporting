'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function (

    $scope,
    $location

  ) {

//-----------Top Bar Highlighting----------------------

   var listElements = document.getElementsByTagName('li');

   var mainBar = angular.element(listElements[0]);
   var createBar = angular.element(listElements[1]);
   var curateBar = angular.element(listElements[2]);



   mainBar.removeClass('active');
   curateBar.removeClass('active');
   createBar.addClass('active');

//------------------------------------------------------
//----------Logic Variable Declaration + Load In--------

$scope.agencyData = [];
$scope.agencyData.length = 13;

                        //0 - Incident Number
                        //1 - Incident Date
                        //2 - Police Agency Name
                        //3 - Agency Number
                        //4 - DispatchTime
                        //5 - Arrival Time
                        //6 - Precinct
                        //7 - Patrol Zone
                        //8 - Investigator
                        //9 - Investigator Badge Number


                        //10 - Reviewer
                        //11 - Reviewer Badge Number
                        //12 - Review Date

//---------------Toggle Buttons-------------------------
    $scope.inputNameValue = '';
    $scope.buttonText = 'Next';

    $scope.caseOpenText = "Case Open"
    $scope.reportableCrashText = "Non-Reportable Crash"
    $scope.caseOpen = true;
    $scope.reportableCrash = false;

    $scope.toggleCaseOpen = function(toggleVal) {

      if(toggleVal == false) {

        $scope.caseOpenText = "Case Closed";
        //Change button color
        $scope.caseOpen = false;
      } else {
        $scope.caseOpenText = "Case Open";
        //Change button color
        $scope.caseOpen = true;

      }


    };

    $scope.toggleReportableCrash = function(toggleVal) {

      if(toggleVal == false) {

        $scope.reportableCrashText = "Non-Reportable Crash";
        //Change button color
        $scope.reportableCrash = false;

      } else {

        $scope.reportableCrashText = "Reportable Crash";
        //Change button color
        $scope.reportableCrash = true;
      }


    };




    $scope.continue = function() {





        $location.path('/create/specify_location');



    };



//---------------Date functions----------------
    $scope.getDate = function() {
       $scope.agencyData[1] = new Date();
     };

    $scope.getReviewDate = function() {
      $scope.agencyData[12] = new Date();
     };

     $scope.getDispatchTime = function() {

       $scope.agencyData[4] = getTime();
     };

    $scope.getArrivalTime = function() {

      $scope.agencyData[5] = getTime();
    };

     var getTime = function() {

        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return (hours + ":" + minutes + ":" + seconds);

      };



  });
