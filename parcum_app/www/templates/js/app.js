angular.module('mapshow', ['ionic', 'mapshow.controllers', 'mapshow.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

