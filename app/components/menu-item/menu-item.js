'use strict';

class MenuItem {
	constructor() {}
}

export default angular.module('menuItem', [])
	.directive('menuItem', () => ({
    templateUrl: 'components/menu-item/menu-item.html',
    restrict: 'E',
    transclude: true,
    scope: {
      // Specify attributes where parents can pass and receive data here
      // Syntax name: 'FLAG'
      // FLAGS:
      // = Two way data binding
      // @ One way incoming expression (like placeholder)
      // & One way outgoing behaviour (like ng-click)
      route: '@',
      active: '&',
    },
    bindToController: true,
    controller: MenuItem ,
    controllerAs: 'ctrl',
	}));
