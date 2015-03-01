'use strict';

class FabHeroTransition {
	constructor($window, $scope) {
    this.show = false;
    this.showContent = false;
    this.$window = $window;
    this.$scope = $scope;
  }

  toggle() {
    if (this.show) {
      this.showContent = false;
      this.$window.setTimeout(() => {
        this.show = false;
        this.$scope.$apply();
      }, 100);
    } else {
      this.show = true;
      this.$window.setTimeout(() => {
        this.showContent = true;
        this.$scope.opened = true;
        this.$scope.$apply();
      }, 300);
    }
  }
}

export default angular.module('fabHeroTransition', [])
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
        label: '@'
			},
			bindToController: true,
			controller: FabHeroTransition ,
			controllerAs: 'ctrl'
		};
	});
