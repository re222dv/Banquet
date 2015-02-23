'use strict';

import Topbar from '../topbar/topbar.js';

class ViewIndex {
  constructor () {
    this.awesomeThings = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Angular Material Design',
        'url': 'https://material.angularjs.org/#/',
        'description': 'The Angular reference implementation of the Google\'s Material Design specification.',
        'logo': 'angular-material.png'
      },
      {
        'title': 'Sass (Node)',
        'url': 'https://github.com/sass/node-sass',
        'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
        'logo': 'node-sass.png'
      },
      {
        'title': 'ES6 (Traceur)',
        'url': 'https://github.com/google/traceur-compiler',
        'description': 'A JavaScript.next-to-JavaScript-of-today compiler that allows you to use features from the future today.',
        'logo': 'traceur.png'
      }
    ];
    this.awesomeThings.forEach(function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  }
}

export default angular.module('viewIndex', ['ngMaterial', Topbar.name])
  .directive('viewIndex', function() {
    return {
      templateUrl: 'components/view-index/view-index.html',
      restrict: 'E',
      scope: {
        // Specify attributes where parents can pass and receive data here
        // Syntax name: 'FLAG'
        // FLAGS:
        // = Two way data binding
        // @ One way incoming expression (like placeholder)
        // & One way outgoing behaviour (like ng-click)
      },
      bindToController: true,
      controller: ViewIndex,
      controllerAs: 'ctrl',
    };
  });
