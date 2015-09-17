'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:InputDriverInfoCtrl
 * @description
 * # InputDriverInfoCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('InputDriverInfoCtrl', function (


    $scope,
    $location,
    $rootScope



    ) {


var pagesWithMistakes = [];
var allDriversInfo = [];
var numberOfCars = $rootScope.numberOfCars;

$scope.name = '';
$scope.dlNumber = '';
$scope.cellPhone = '';
$scope.address = '';
$scope.social = '';
$scope.email = '';
$scope.statement = '';


$scope.currentIndex = 0;

$scope.pagesWithErrors = '';



//Create object array of ints mandated by angular for ng-repeat
$scope.repeatHelper = [];

for(var i = 0; i < numberOfCars; i++) {

  $scope.repeatHelper[i] = i;


  allDriversInfo.push({

    "name": $scope.name,
    "dl_Number": $scope.dlNumber,
    "cell_Number": $scope.cellPhone,
    "address": $scope.address,
    "social_Security": $scope.social,
    "email": $scope.email,
    "statement": $scope.statement

  });


}

//If Were On The Last Page, Throw a Continue Button On - This is For Case 1 Only
if(numberOfCars == 1) {

   $scope.onLastPane = true;

}



//---------Create Paging Functionality ---------------------

$scope.createPagination = function(currIndex) {



  //Save Old Page
    allDriversInfo[$scope.currentIndex] = {

      "name": $scope.name,
      "dlNumber": $scope.dlNumber,
      "cellPhone": $scope.cellPhone,
      "address": $scope.address,
      "social": $scope.social,
      "email": $scope.email,
      "statement": $scope.statement

    };


if(numberOfCars !== 1) { //If this is not a one car report

  //Clear Old Page
  $scope.name = '';
  $scope.dlNumber = '';
  $scope.cellPhone = '';
  $scope.address = '';
  $scope.social = '';
  $scope.email = '';
  $scope.statement = '';


  //Move to new page on bottom bar
   $scope.currentIndex = currIndex;


  //Populate New Page
  var driverInfo = allDriversInfo[$scope.currentIndex];

  $scope.name = driverInfo.name;
  $scope.dlNumber = driverInfo.dlNumber;
  $scope.cellPhone = driverInfo.cellPhone;
  $scope.address = driverInfo.address;
  $scope.social = driverInfo.social;
  $scope.email = driverInfo.email;
  $scope.statement = driverInfo.statement;

}


  //If Were On The Last Page, Throw a Continue Button On
  if($scope.currentIndex == (numberOfCars-1)) {

     $scope.onLastPane = true;

  }


};


//-----------See if We Can Go to the Next Section-----------
$scope.continueButtonCtrl = function() {


  //Save current pages fields
  allDriversInfo[$scope.currentIndex] = {

    "name": $scope.name,
    "dlNumber": $scope.dlNumber,
    "cellPhone": $scope.cellPhone,
    "address": $scope.address,
    "social": $scope.social,
    "email": $scope.email,
    "statement": $scope.statement

  };


  //See if errors exist in current forms
  var errors = filledInNessecaryFields();

  //If there are no errors, continue, else, list them
  if(errors.length == 0) {



  //Continue to next page
  $location.path('/create/sketchMap');


  } else {

    $scope.displayErrorMessage = true;


    $scope.pagesWithErrors = '';


  for(var i = 0; i < errors.length; i++) {


    $scope.pagesWithErrors += (errors[i]+1) + ' ';

   }


  }



};



//--------Check if Nessecary Fields Have Been Filled Out--------
var filledInNessecaryFields = function() {

  var pagesWithMistakes =[];

for(var i = 0; i < numberOfCars; i++) {

 var drivers = allDriversInfo[i];

  if(drivers.name == '' || drivers.social == '' || drivers.statement == '') {

      pagesWithMistakes.push(i);

    }

 }

 return pagesWithMistakes;

};

//---------Handle Bottom Navigation Bar----------------------
$scope.moveToPreviousPage = function() {

  var curr = $scope.currentIndex;

  if(numberOfCars !== 1) {
  if(curr == 0) {

    curr = numberOfCars;

  } else {

  curr--;

}

$scope.createPagination(curr);
}
};

$scope.moveToNextPage = function() {

  var curr = $scope.currentIndex;

if(numberOfCars !== 1) {
if(curr == numberOfCars) {

  curr = 0;

} else {

  curr++;

}

$scope.createPagination(curr);
}

}
//------------------------------------------------------------



});  //End of Controller
