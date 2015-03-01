'use strict';
/*jshint esnext: true */
import NerbyPlaces from './components/nerby-places/nerby-places.js';
import PlaceDetail from './components/place-detail/place-detail.js';
import PlaceMap from './components/place-map/place-map.js';

// 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
angular.module('banquet', [
  'ui.router', 'ngMaterial', 'alAngularHero',
  NerbyPlaces.name, PlaceDetail.name, PlaceMap.name
])
  //.controller('MainCtrl', MainCtrl)
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('pink');
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('place', {
        url: '/place/:id',
        template: '<place-detail id="{{id}}" layout-fill></place-detail>',
        controller: function ($scope, $stateParams) {
          $scope.id = $stateParams.id;
        }
      })
      .state('home', {
        url: '/',
        template: '<nerby-places layout-fill></nerby-places>'
      });

    $urlRouterProvider.otherwise('/');
  });
