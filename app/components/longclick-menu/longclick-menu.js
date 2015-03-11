'use strict';

class LongclickMenu {
	constructor($window) {
    this.$window = $window;
  }

  get isOnMobile() {
    return this.$window.innerWidth < 600;
  }

  open() {
    this.show = true;
  }
}

function link(scope, element, attrs, ctrl) {
  element[0].addEventListener('contextmenu', (e) => {
    if (ctrl.isOnMobile) {
      ctrl.open(e);
      e.preventDefault();
    }
  });
}

export default angular.module('longclickMenu', [])
	.directive('longclickMenu', () => ({
    templateUrl: 'components/longclick-menu/longclick-menu.html',
    transclude: true,
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
    controller: LongclickMenu,
    controllerAs: 'ctrl',
    link,
	}));
