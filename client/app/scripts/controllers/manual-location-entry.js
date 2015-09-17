'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ManualLocationEntryCtrl
 * @description
 * # ManualLocationEntryCtrl
 * Controller of the clientApp
 */
var app = angular.module('clientApp');

app.controller('ManualLocationEntryCtrl', function (

    $scope,
    $location,
    $rootScope

    ) {

//-------Initialize Variables and Set Mode----------

        var rendererOptions = {
          draggable: true
        };
        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
        var directionsService = new google.maps.DirectionsService();

      var workaround = ['1','2','3'];

      $scope.haveGeocoded = false;
      $scope.buttonText = "Geocode";
      $scope.geoCodeCoords = [];

      $scope.isOther = false;
      $scope.isIntersection = false;
      $scope.isMidBlock = false;
      $scope.typeOfMainRoad = "Route Signing"


      var geocoder = new google.maps.Geocoder();
      $scope.routeSigning = ['Interstate','Turnpike','Turnpike spur', 'State Highway', 'County Road', 'Local Road or Street',
      'Private Road', 'Other'];
      var marker;
      var extraMarkers = [];


      $scope.intersectingRoadInfo = [];
      $scope.midBlockPositionInfo = [];

//----------Beginning of functions-----------------------


function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = (total / 1000.0)*0.621371;
  return  parseFloat(total).toFixed(2); //Convert to Miles
}


$scope.getRouteTypeOfMainRoad = function(id) {


  $scope.typeOfMainRoad = $scope.routeSigning[id];

};

$scope.getRouteTypeOfIntersectingRoad = function(id) {


$scope.typeOfIntersectionRoat = $scope.routeSigning[id];


};

function updateIntersectionPosition(pos) {


  geocoder.geocode({'location': pos}, function(results, status) {


    if (results[1]) {

    $scope.intersectingRoadInfo[0] = results[0].address_components[1].long_name;
    $scope.$apply();

    }


  });

}


function updateMidBlockPosition2() {


  geocoder.geocode({'location': extraMarkers[2].getPosition()}, function(results, status) {


    if (results[1]) {

    $scope.intersectingRoadInfo[1] = results[0].address_components[1].long_name;
    $scope.$apply();

    }


  });


}
function updateMidBlockPosition1() {


    geocoder.geocode({'location': extraMarkers[1].getPosition()}, function(results, status) {


      if (results[1]) {

      $scope.intersectingRoadInfo[0] = results[0].address_components[1].long_name;

      }


    });



  var request = {
     origin: extraMarkers[1].getPosition(),
     destination: marker.getPosition(),
    // waypoints:[{location: marker.getPosition()}],
     travelMode: google.maps.TravelMode.DRIVING
   };
   directionsService.route(request, function(response, status) {
     if (status == google.maps.DirectionsStatus.OK) {
       directionsDisplay.setDirections(response);
       $scope.intersectingRoadInfo[2] = computeTotalDistance(directionsDisplay.getDirections()) + " Miles";
     }
   });


   //$scope.intersectingRoadInfo[2] = computeTotalDistance(directionsDisplay.getDirections());
   $scope.$apply();



}


function updatePosition(pos) {

        var infowindow = new google.maps.InfoWindow();


        $scope.geoCodeCoords[0] = pos;
        geocoder.geocode({'location': pos}, function(results, status) {


          if (status == google.maps.GeocoderStatus.OK) {



            if (results[1]) {

                $scope.geoCodeCoords[1] = results[0].address_components[0].long_name + ", " + results[0].address_components[1].long_name;
                $scope.geoCodeCoords[2] = results[0].address_components[4].long_name;
                $scope.geoCodeCoords[3] = results[0].address_components[2].long_name + " " + results[0].address_components[3].long_name;

              if($scope.isMidBlock) {

                var request = {
                   origin: extraMarkers[1].getPosition(),
                   destination: marker.getPosition(),
                  // waypoints:[{location: marker.getPosition()}],
                   travelMode: google.maps.TravelMode.DRIVING
                 };
                 directionsService.route(request, function(response, status) {
                   if (status == google.maps.DirectionsStatus.OK) {
                     directionsDisplay.setDirections(response);
                     $scope.intersectingRoadInfo[2] = computeTotalDistance(directionsDisplay.getDirections()) + " Miles";
                   }
                 });
               }

                infowindow.setContent("Drag to position of crash");
                infowindow.open($rootScope.map, marker);

                $scope.$apply();


            } else {
              window.alert('No results found');
            }

          } else {
            window.alert('Geocoder failed due to: ' + status);
          }

        });


      }

$scope.reverseGeocode = function() {

        $scope.haveGeocoded = true;
        var infowindow = new google.maps.InfoWindow();
        var infowindows = [];


        var latlng = [];
        latlng[0] = new google.maps.LatLng($rootScope.map.center.lat(), $rootScope.map.center.lng());
        latlng[1] = new google.maps.LatLng($rootScope.map.center.lat(), $rootScope.map.center.lng()+.0005);
        latlng[2] = new google.maps.LatLng($rootScope.map.center.lat(), $rootScope.map.center.lng()-.0005);


        var pinColor = "FE7569";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));


        if($rootScope.crashType == 0) {          //For midblock mode

          $scope.isMidBlock = true;

          directionsDisplay.setMap($rootScope.map); // Watch for this plox





          for(var i = 1; i < 3; i++) {

           extraMarkers[i] = new google.maps.Marker({

            draggable: true,
            position: latlng[i],
            map: $rootScope.map,
            icon: pinImage,
            shadow: pinShadow

          });

          infowindows[i-1] = new google.maps.InfoWindow();
          infowindows[i-1].setContent("Drag to position of landmark " + i);
          infowindows[i-1].open($rootScope.map, extraMarkers[i]);

        }


        google.maps.event.addListener(extraMarkers[1], 'dragend', function() {
        updateMidBlockPosition1();
        });

        google.maps.event.addListener(extraMarkers[2], 'dragend', function() {
        updateMidBlockPosition2();
        });

        } else if ($rootScope.crashType == 1) {  //For intersection mode

          $scope.isIntersection = true;

          extraMarkers[0] = new google.maps.Marker({

           draggable: true,
           position: latlng[1],
           map: $rootScope.map,
           icon: pinImage,
           shadow: pinShadow

         });

         infowindows[0] = new google.maps.InfoWindow();
         infowindows[0].setContent("Drag Anywhere On Intersecting Street");
         infowindows[0].open($rootScope.map, extraMarkers[0]);


         google.maps.event.addListener(extraMarkers[0], 'dragend', function() {
         updateIntersectionPosition(extraMarkers[0].getPosition());
         });

       }



                marker = new google.maps.Marker({
                  draggable: true,
                  position: latlng[0],
                  map: $rootScope.map
                });

                infowindow.setContent("Drag to position of crash");
                infowindow.open($rootScope.map, marker);

                google.maps.event.addListener(marker, 'dragend', function() {
                updatePosition(marker.getPosition());
                });



      //  $location.path('/create/selectNumberOfCars');
};

$scope.continue = function() {

  $location.path('/create/selectNumberOfCars');

};





//-----------Everything after this works-----------
    // current location
    $scope.loc = { lat: 40, lon: -73 };
    $scope.gotoCurrentLocation = function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var c = position.coords;
                $scope.gotoLocation(c.latitude, c.longitude);
            });
            return true;
        }
        return false;
    };

    $scope.gotoLocation = function (lat, lon) {
        if ($scope.lat !== lat || $scope.lon !== lon) {
            $scope.loc = { lat: lat, lon: lon };
            if (!$scope.$$phase) $scope.$apply('loc');
        }
    };

    // geo-coding
    $scope.search = '';
    $scope.geoCode = function () {
        if ($scope.search && $scope.search.length > 0) {
            if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
            this.geocoder.geocode({ 'address': $scope.search }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    $scope.search = results[0].formatted_address;
                    $scope.gotoLocation(loc.lat(), loc.lng());
                } else {
                    alert('Sorry, this search produced no results.');
                }
            });
        }
    };


  });


// formats a number as a latitude (e.g. 40.46... => '40°27'44'N')
app.filter('lat', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? 'N' : 'S';
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
});

// formats a number as a longitude (e.g. -80.02... => '80°1'24'W')
app.filter('lon', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ew = input > 0 ? 'E' : 'W';
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ew;
    }
}); //End of Controller

// - Documentation: https://developers.google.com/maps/documentation/
app.directive('appMap', function ($rootScope) {
    return { //B1
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        scope: {
            center: '=',        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            markers: '=',       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: 'hello' }]</code>).
            width: '@',         // Map width in pixels.
            height: '@',        // Map height in pixels.
            zoom: '@',          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            mapTypeId: '@',     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
            panControl: '@',    // Whether to show a pan control on the map.
            zoomControl: '@',   // Whether to show a zoom control on the map.
            scaleControl: '@'   // Whether to show scale control on the map.
        },
        link: function (scope, element, attrs) { //B4
            var toResize, toCenter;
            var map;
            var currentMarkers;

            // listen to changes in scope variables and update the control
            var arr = ['width', 'height', 'markers', 'mapTypeId', 'panControl', 'zoomControl', 'scaleControl'];
            for (var i = 0, cnt = arr.length; i < arr.length; i++) {
                scope.$watch(arr[i], function () {
                    cnt--;
                    if (cnt <= 0) {
                        updateControl();
                    }
                });
            }

            // update zoom and center without re-creating the map
            scope.$watch('zoom', function () {
                if (map && scope.zoom)
                    map.setZoom(scope.zoom * 1);
            });

            scope.$watch('center', function () {
                if (map && scope.center)
                    map.setCenter(getLocation(scope.center));
            });

            // update the control
            function updateControl() { //B2

                // update size
                if (scope.width) element.width(scope.width);
                if (scope.height) element.height(scope.height);

                // get map options
                var options =
                {
                    center: new google.maps.LatLng(40, -73),
                    zoom: 6,
                    mapTypeId: 'hybrid'
                };

                if (scope.center) options.center = getLocation(scope.center);
                if (scope.zoom) options.zoom = scope.zoom * 1;
                if (scope.mapTypeId) options.mapTypeId = scope.mapTypeId;
                if (scope.panControl) options.panControl = scope.panControl;
                if (scope.zoomControl) options.zoomControl = scope.zoomControl;
                if (scope.scaleControl) options.scaleControl = scope.scaleControl;

                // create the map
                map = new google.maps.Map(element[0], options);
                $rootScope.map = map;



//Create the box and bind it-------------------------------
var markers = [];

var input = /** @type {HTMLInputElement} */(
  document.getElementById('pac-input'));

var searchBox = new google.maps.places.SearchBox(
/**@type {HTMLInputElement} */(input));



google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });



//Finish my bullshit-----------------------------------------

                // update markers
                updateMarkers();

                // listen to changes in the center property and update the scope
                google.maps.event.addListener(map, 'center_changed', function () {

                    // do not update while the user pans or zooms
                    if (toCenter) clearTimeout(toCenter);
                    toCenter = setTimeout(function () {
                        if (scope.center) {

                            // check if the center has really changed
                            if (map.center.lat() !== scope.center.lat ||
                                map.center.lng() !== scope.center.lon) {

                                // update the scope and apply the change
                              scope.center = { lat: map.center.lat(), lon: map.center.lng() };

                              $rootScope.transferredMapCenter = {center: {latitude: map.center.lat(),
                                longitude: map.center.lng()}, zoom: map.zoom };




                                if (!scope.$$phase) scope.$apply('center');
                            }
                        }
                    }, 500);
                });
            } //B2

            // update map markers to match scope marker collection
            function updateMarkers() { //B3
                if (map && scope.markers) {

                    // clear old markers
                    if (currentMarkers !== null) {
                        for (var i = 0; i < currentMarkers.length; i++) {
                            currentMarkers[i] = m.setMap(null);
                        }
                    }

                    // create new markers
                    currentMarkers = [];
                    var markers = scope.markers;
                    if (angular.isString(markers)) markers = scope.$eval(scope.markers);
                    for (var i = 0; i < markers.length; i++) {
                        var m = markers[i];
                        var loc = new google.maps.LatLng(m.lat, m.lon);
                        var mm = new google.maps.Marker({ position: loc, map: map, title: m.name });
                        currentMarkers.push(mm);
                    }
                }
            } //B3

            // convert current location to Google maps location
            function getLocation(loc) {
                if (loc == null) return new google.maps.LatLng(40, -73);
                if (angular.isString(loc)) loc = scope.$eval(loc);
                return new google.maps.LatLng(loc.lat, loc.lon);
            }
        } //B4
    }; //B1
}); //End of directive 1

//----------------------------------------------------
