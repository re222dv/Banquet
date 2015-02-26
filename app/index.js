'use strict';
/*jshint esnext: true */

import NerbyPlaces from './components/nerby-places/nerby-places.js';
import PlaceDetail from './components/place-detail/place-detail.js';
import PlaceMap from './components/place-map/place-map.js';
import ViewIndex from './components/view-index/view-index.js';

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
        template: '<place-detail id="{{id}}"></place-detail>',
        controller: function ($scope, $stateParams) {
          $scope.id = $stateParams.id;
        }
      })
      .state('map', {
        url: '/map',
        template: '<place-map></place-map>'
      })
      .state('home', {
        url: '/',
        template: '<nerby-places></nerby-places>'
      });

    $urlRouterProvider.otherwise('/');
  });
