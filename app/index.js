'use strict';
/*jshint esnext: true */

import NerbyPlaces from './components/nerby-places/nerby-places.js';
import ViewIndex from './components/view-index/view-index.js';

// 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
angular.module('banquet', [
  'ui.router', 'ngMaterial',
  NerbyPlaces.name
])
  //.controller('MainCtrl', MainCtrl)
  //.config(function ($mdThemingProvider) {
  //
  //  //$mdThemingProvider.setDefaultTheme('default');
  //})
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<nerby-places></nerby-places>'
      });

    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('pink');
  });
