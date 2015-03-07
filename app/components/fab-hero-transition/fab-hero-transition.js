'use strict';

import PaperIcon from '../paper-icon/paper-icon.js';

class FabHeroTransition {
	constructor($window, $scope) {
    this.load = false;
    this.show = false;
    this.showContent = false;
    this.opened = false;
    this.$window = $window;
    this.$scope = $scope;

    $window.setTimeout(() => {
      this.load = true;
      $scope.$apply();
    }, 200);
  }

  toggle() {
    if (this.show) {
      this.show = false;
      this.showContent = false;
      this.$window.setTimeout(() => {
        this.opened = false;
        this.$scope.$apply();
      }, 300);
    } else {
      this.show = true;
      this.$window.setTimeout(() => {
        this.showContent = true;
        this.$scope.$apply();
        this.$window.setTimeout(() => {
          this.opened = true;
          this.$scope.$apply();
        }, 300);
      }, 500);
    }
  }
}

export default angular.module('fabHeroTransition', [PaperIcon.name])
	.directive('fabHeroTransition', function() {
		return {
			templateUrl: 'components/fab-hero-transition/fab-hero-transition.html',
			restrict: 'E',
      transclude: true,
      require: '^fabHeroTransition',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        label: '@',
        icon: '@',
        opened: '=',
			},
			bindToController: true,
			controller: FabHeroTransition ,
			controllerAs: 'ctrl'
		};
	})
  .animation('.fab-animation', function($animate) {

  });
