'use strict';

class Topbar {
  constructor () {
    this.date = new Date();
  }
}

export default angular.module('topbar', ['ngMaterial'])
	.directive('topbar', function() {
		return {
			templateUrl: 'components/topbar/topbar.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
			},
      controller: Topbar,
      controllerAs: 'ctrl'
		};
	});
