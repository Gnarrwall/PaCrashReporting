'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:InteractiveMapDrawingCtrl
 * @description
 * # InteractiveMapDrawingCtrl
 * Controller of the clientApp
 */
app = angular.module('clientApp');

app.controller('InteractiveMapDrawingCtrl', function (

    $scope,
    $rootScope,
    $location,
    $timeout,
    $log,
    $interval,
    uiGmapIsReady


    ) {



  //Create map and set location to previously specfified location
  $rootScope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 }; // $rootScope.transferredMapCenter;
  $scope.options = {scrollwheel: false, mapTypeId:'hybrid'};
  $scope.coordsUpdates = 0;
  $scope.dynamicMoveCtr = 0;






  //Set up objects for NG-Repeat
    var numberOfIcons = 5;
    var numberOfCars = 5; //$rootScope.numberOfCars;
    var poly = [];
    var currPolyLineId;
    var markIndex = 0;
    var map = '';



    //Create markers - rootScope because of NG-Repeat
     $rootScope.markers = [];



    $scope.repeatHelper = [];
    $scope.buttonText = [];

    $scope.showPolylineIcon = [];
    $scope.showPolyline = [];
    $scope.showDrawingIcon = [];


    $scope.showIcon = [];


 //Initialize Boolean Arrays for Ng-Show and Ng-Repeat Directives
  for(var i = 0; i < numberOfCars; i++) {

          $scope.repeatHelper[i] = i;
          $scope.buttonText.push('Add');
          $scope.showIcon.push(true);
          $scope.showDrawingIcon.push(true);
          $scope.showPolylineIcon.push(true);

      }
  for(var i2 = 0; i2 < numberOfIcons; i2++) {

     $scope.buttonText.push('Add');
     $scope.showIcon.push(true);
     $scope.showDrawingIcon.push(true);
     $scope.showPolylineIcon.push(true);

     }


//----------------Get gMaps Map Object-------------------------
   uiGmapIsReady.promise(1).then(function(instances) {
       instances.forEach(function(inst) {

           map = inst.map;

       });
   });

//---------------End of Initializations, Beginning of Functions---------------------

   function addLatLng(event, idOfButton){

       var path = poly[currPolyLineId].getPath();
       path.push(event.latLng);

   }


function toggle(idOfButton) {

/*
  <a ng-show="!showIcon[i] && showPolylineIcon[i]" ng-click="addPolyLine(i)" href="javascript:void(0)" class="badge">Polyline
    <span ng-class="{'glyphicon glyphicon-pencil': showDrawingIcon[i], 'glyphicon glyphicon-ok': !showDrawingIcon[i]}"></span></a> */

    if($scope.showDrawingIcon[idOfButton] == false) {

      for(var index = 0; index < numberOfCars; index++) {

        $scope.showPolylineIcon[index] = true;

      }

      $scope.showDrawingIcon[idOfButton] = true;

    } else {


      for(var index1 = 0; index1 < numberOfCars; index1++) {

        if(index1 !== idOfButton) {

        $scope.showPolylineIcon[index1] = false;

        }


      }

      $scope.showDrawingIcon[idOfButton] = false;

    }


}

$scope.addPolyLine = function(idOfButton) {

  toggle(idOfButton);


  //$scope.showDrawingIcon[idOfButton] = !$scope.showDrawingIcon[idOfButton];

  currPolyLineId = idOfButton;
  google.maps.event.clearListeners(map, 'click');

  var color;


  switch(idOfButton) {

    case 0:
    color = '#FF9494';
    break;

    case 1:
    color = '#B2FFb2';
    break;

    case 2:
    color = '#7575FF';
    break;

    default:
    color = '#00ABD3';
    break;


  }


  var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#393'
  };



  if(typeof poly[idOfButton] == 'undefined') {


poly[idOfButton] = new google.maps.Polyline(

{
strokeColor: color,
strokeOpacity: 1.0,
strokeWeight: 2,
icons: [{
      icon: lineSymbol,
      offset: '0%'
    },
    {
          icon: lineSymbol,
         offset: '100%'
        }]
});


}

poly[idOfButton].setMap(map);



google.maps.event.addListener(map, 'click', addLatLng);


};

var interval;

$scope.startAnimation = function() {

    var count = 0;
    var index = 0;
    var numOfAnimations = numberOfCars;

    interval =  window.setInterval(function() {

    index = index % numOfAnimations;
    count = (count + 1) % 200;

    if(typeof poly[index] != 'undefined') {

    var icons = poly[index].get('icons');
    icons[0].offset = (count / 2) + '%';
    poly[index].set('icons', icons);

  }

   index++;

 }, 30);
}


$scope.stopAnimation = function () {


 clearInterval(interval);


};

/*


var count = 0;
var numOfAnimations = numberOfCars;
var index = 0;

window.setInterval(function() {

  index = index % numOfAnimations;
  count = (count + 1) % 200;

  if(typeof poly[index] != 'undefined') {

  var icons = poly[index].get('icons');
  icons[0].offset = (count / 2) + '%';
  poly[index].set('icons', icons);

}

index++;


*/
/*
<path fill="#231F20" d="M73.3,134.1c0,0,8.6,19.1,12,20.5c3.4,1.4,11.4-3.8,11.4-3.8l-9.1-16.2L73.3,134.1z"/>
<path fill="#231F20" d="M74,20.6c0,0,8.8-19,12.3-20.4c3.4-1.4,11.3,4,11.3,4l-9.3,16L74,20.6z"/>
<g>
  <path fill="#808083" d="M5.1,106.5c-7-17.6-6.8-41.6,0.4-59.1c7.2-17.5,15.4-30,43.7-29c28.3,1,143.5,2.2,173.1,2.5
    C252,21.2,259,54,259,54l-0.3,49c0,0-7.4,32.8-37,32.7c-29.6-0.1-144.9-0.3-173.2,0.3C20.2,136.7,12.1,124,5.1,106.5z"/> //End of here
  <polygon fill="#231F20" points="114.7,124.1 186,123 214.7,133.4 79.8,133.1 		"/>
  <path fill="#231F20" d="M112.3,120.8c-1-5.8-1.9-26.1-2.7-43.2c-0.9-17.1,2.3-37.4,3.3-43.2c0,0-29.2-7.5-38-9.7
    C64.6,48.1,62.3,62.6,62.5,78.4c0.2,15.8,1.7,27.9,11.7,51.7C82.9,127.9,112.3,120.8,112.3,120.8z"/>                   //End of here


  <path fill="#231F20" d="M187.7,120.1c3-10.8,5.8-24.6,6.7-42.1c0.9-17.4-5.2-38.3-6.2-42c8.7-2.3,8.7-2.4,29-9.9
    c0,0,5.8,30.9,6,52.2c0.1,21.3-6.6,52-6.6,52C196.4,122.6,196.4,122.5,187.7,120.1z"/>
  <g>
    <defs>
      <path id="SVGID_1_" d="M5.1,106.5c7,17.6,15.1,30.2,43.4,29.6c28.3-0.6,143.5-0.4,173.2-0.3c29.6,0.1,37-32.7,37-32.7l-0.4-24.6//
        L0,76.9C0,76.9-1.9,88.9,5.1,106.5z"/>
    </defs>
    <clipPath id="SVGID_2_">
      <use xlink:href="#SVGID_1_"  overflow="visible"/>
    </clipPath>
    <path clip-path="url(#SVGID_2_)" fill="#FDBB16" d="M2.6,110.1l0.3,0.2c0,0,28,12.4,46.1,28.4c-2.8,4.7-22.1,0.2-31.7-5.1
      C7.6,128.3,2.6,110.1,2.6,110.1z"/>
  </g>
</g>
<g>
  <polygon fill="#231F20" points="115.3,31.1 186.6,33.2 215.4,23.1 80.5,21.7 		"/>
  <g>
    <defs>
      <path id="SVGID_3_" d="M5.5,47.4c7.2-17.5,15.4-30,43.7-29c28.3,1,143.5,2.2,173.1,2.5C252,21.2,259,54,259,54l-0.7,24.6L0,76.9
        C0,76.9-1.7,64.8,5.5,47.4z"/>
    </defs>
    <clipPath id="SVGID_4_">
      <use xlink:href="#SVGID_3_"  overflow="visible"/>
    </clipPath>
    <path clip-path="url(#SVGID_4_)" fill="#FDBB16" d="M3,43.8l0.3-0.2c0,0,28.2-12,46.5-27.9C47,11,27.7,15.2,18,20.4
      C8.3,25.6,3,43.8,3,43.8z"/>
  </g>
</g>
</g> */

function placeMarker(idOfButton, markerIcon) {

  var fColor;

  switch(idOfButton) {

    case 0:
    fColor = '#FF9494';
    break;

    case 1:
    fColor = '#B2FFb2';
    break;
    //'#0E77E9'
    case 2:
    fColor = '#7575FF';
    break;

    default:
    fColor = '#00ABD3';
    break;


  }

  markerIcon = {

    path: 'M73.3,134.1c0,0,8.6,19.1,12,20.5c3.4,1.4,11.4-3.8,11.4-3.8l-9.1-16.2L73.3,134.1z M74,20.6c0,0,8.8-19,12.3-20.4c3.4-1.4,11.3,4,11.3,4l-9.3,16L74,20.6z M5.1,106.5c-7-17.6-6.8-41.6,0.4-59.1c7.2-17.5,15.4-30,43.7-29c28.3,1,143.5,2.2,173.1,2.5 C252,21.2,259,54,259,54l-0.3,49c0,0-7.4,32.8-37,32.7c-29.6-0.1-144.9-0.3-173.2,0.3C20.2,136.7,12.1,124,5.1,106.5z M112.3,120.8c-1-5.8-1.9-26.1-2.7-43.2c-0.9-17.1,2.3-37.4,3.3-43.2c0,0-29.2-7.5-38-9.7 C64.6,48.1,62.3,62.6,62.5,78.4c0.2,15.8,1.7,27.9,11.7,51.7C82.9,127.9,112.3,120.8,112.3,120.8z M187.7,120.1c3-10.8,5.8-24.6,6.7-42.1c0.9-17.4-5.2-38.3-6.2-42c8.7-2.3,8.7-2.4,29-9.9 c0,0,5.8,30.9,6,52.2c0.1,21.3-6.6,52-6.6,52C196.4,122.6,196.4,122.5,187.7,120.1z M2.6,110.1l0.3,0.2c0,0,28,12.4,46.1,28.4c-2.8,4.7-22.1,0.2-31.7-5.1 C7.6,128.3,2.6,110.1,2.6,110.1z M5.5,47.4c7.2-17.5,15.4-30,43.7-29c28.3,1,143.5,2.2,173.1,2.5C252,21.2,259,54,259,54l-0.7,24.6L0,76.9 C0,76.9-1.7,64.8,5.5,47.4z M3,43.8l0.3-0.2c0,0,28.2-12,46.5-27.9C47,11,27.7,15.2,18,20.4 C8.3,25.6,3,43.8,3,43.8z',
    fillColor: fColor,
    fillOpacity: 1,
    anchor: new google.maps.Point(0,0),
    strokeColor: 'gold',
    strokeWeight: 1,
    scale: .2,
    rotation: 0

  };

  var center = map.getCenter();

  var marker = {

      "id": idOfButton,
  		"latitude": center.lat(),
    	"longitude": center.lng(),
      "icon": markerIcon,
      "options": {
              draggable: true,
              labelClass:'labels',
              labelAnchor:'5 20',
              labelContent: idOfButton+1
        }
  };

  $rootScope.markers.push(marker);

}


function removeMarker(idOfButton) {

    for(var i = 0; i < $rootScope.markers.length; i++) {

      if($rootScope.markers[i].id == idOfButton) {
        $rootScope.markers.splice(i, 1);
      }

    }

    if(poly[idOfButton] != undefined) {
    poly[idOfButton].setMap(null);
    poly[idOfButton] = undefined;
    }


    toggle(idOfButton);

}



$scope.addMarkerToMap = function(idOfButton, indexInNG) {


  google.maps.event.clearListeners(map, 'click');

  switch(idOfButton) {

    case 0:                                     // Car Case


if($scope.showIcon[indexInNG]) {                // If its on the add screen

    $scope.showIcon[indexInNG] = false;         // Switch index to '-'
    $scope.buttonText[indexInNG] = 'Remove';    // Switch Button Text
    placeMarker(indexInNG, 'https://maps.google.com/mapfiles/kml/shapes/schools_maps.png');  // Add the marker, with correct icon

} else {

  $scope.showIcon[indexInNG] = true;           // Switch index to '-'
  $scope.buttonText[indexInNG] = "Add";        // Switch Button Text
  removeMarker(indexInNG);                    // Remove The Marker
}


        break;
    case 1:

        break;
    case 2:

        break;
    case 3:

        break;
    default:

}





}


//-------------Continue On to Next Pagelol---------
$scope.continueButtonCtrl = function() {


  $location.path('/create/provideWrittenReport');


};

//-------------Rotate the Marker--------------------
$scope.rotateMarker = function(id) {

  $rootScope.markers[id].icon.rotation += 15;

  var currRotation = $rootScope.markers[id].icon.rotation % 360;
  var temp;
  var temp1;

  //Split and convert to a numberWasPressed
  var base = $rootScope.markers[id].options.labelAnchor;
  var splitBase = base.split(" ");

  var hor = parseInt(splitBase[0]);
  var ver = parseInt(splitBase[1]);


  var horizontal = parseFloat(hor);
  var vertical = parseFloat(ver);



var vertDist = (12/6);
var horoDist = (12/6);





if(currRotation < 15) {

  vertical += vertDist;
  horizontal -= horoDist;

} else if(currRotation <= 90) {


    vertical -= vertDist;
    horizontal -= horoDist;

} else if (currRotation <= 180) {

  vertical -= vertDist;
  horizontal += horoDist;

} else if (currRotation <= 270) {

  vertical += vertDist;
  horizontal += horoDist;

} else if (currRotation < 360) {

  vertical += vertDist;
  horizontal -= horoDist;

}


 $rootScope.markers[id].options.labelAnchor = horizontal + " " + vertical;

};


var promise;

$scope.mouseDown = function(id) {
          promise = $interval(function () {


          $scope.rotateMarker(id);


        }, 100);

        };

$scope.mouseUp = function () {
           $interval.cancel(promise);
        };






  });
