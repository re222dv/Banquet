'use strict';
/*jshint esnext: true */

import MainCtrl from './main/main.controller';
import ViewIndex from '../components/view-index/view-index.js';

// 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
angular.module('banquet', [
  'ui.router', 'ngMaterial',
  ViewIndex.name
])
  .controller('MainCtrl', MainCtrl)

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<view-index></view-index>'
      });

    $urlRouterProvider.otherwise('/');
  });
