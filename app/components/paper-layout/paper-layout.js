'use strict';

class PaperLayout {
	constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  toggle(id) {
    console.log(id);
    this.$mdSidenav(id).toggle();
  }
}

export default angular.module('paperLayout', ['ngMaterial', 'multi-transclude'])
	.directive('paperLayout', function() {
		return {
			templateUrl: 'components/paper-layout/paper-layout.html',
			restrict: 'E',
      transclude: true,
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
			},
			bindToController: true,
			controller: PaperLayout ,
			controllerAs: 'ctrl'
		};
	});
