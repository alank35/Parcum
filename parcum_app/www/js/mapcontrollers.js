angular.module('starter.mapcontrollers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos.coords.latitude, pos.coords.longitude);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
      //$ionicLoading.hide();
    }, function (error) {
      $scope.loading.hide();
      alert('Unable to get location: ' + error.message);
    }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
  };
});
