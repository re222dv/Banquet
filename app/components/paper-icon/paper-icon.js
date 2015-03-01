'use strict';

class PaperIcon {
	constructor() {}
}

export default angular.module('paperIcon', [])
	.directive('paperIcon', function() {
		return {
			templateUrl: 'components/paper-icon/paper-icon.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        icon: '@',
			},
			bindToController: true,
			controller: PaperIcon ,
			controllerAs: 'ctrl'
		};
	})
  .filter('icon', function() {
    return function(input) {
      return input.split(':')[1];
    };
  })
  .filter('set', function() {
    return function(input) {
      return input.split(':')[0];
    };
  });
