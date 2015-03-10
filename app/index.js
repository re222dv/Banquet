'use strict';
/*jshint esnext: true */
import MenuItem from './components/menu-item/menu-item.js';
import LatestReviews from './components/latest-reviews/latest-reviews.js';
import NerbyPlaces from './components/nerby-places/nerby-places.js';
import PlaceDetail from './components/place-detail/place-detail.js';
import PaperLayout from './components/paper-layout/paper-layout.js';
import PlaceMap from './components/place-map/place-map.js';

// 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
angular.module('banquet', [
  'ui.router', 'ngMaterial', 'alAngularHero',
  MenuItem.name, LatestReviews.name, NerbyPlaces.name, PlaceDetail.name, PaperLayout.name,
  PlaceMap.name
])
  //.controller('MainCtrl', MainCtrl)
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
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
      .state('user', {
        url: '/user/:id',
        template: '<user-detail layout-fill></user-detail>'
      })
      .state('reviews', {
        url: '/reviews',
        template: '<latest-reviews layout-fill></latest-reviews>'
      })
      .state('home', {
        url: '/',
        template: '<nerby-places layout-fill></nerby-places>'
      });

    $urlRouterProvider.otherwise('/');
  });
