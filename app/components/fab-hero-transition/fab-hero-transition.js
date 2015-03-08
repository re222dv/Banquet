'use strict';

import PaperIcon from '../paper-icon/paper-icon.js';

class FabHeroTransition {
	constructor($scope, $timeout) {
    this.$scope = $scope;
    this.$timeout = $timeout;

    this.load = false;
    this.show = false;
    this.showContent = false;
    this.opened = false;

    $timeout(() => {
      this.load = true;
    }, 200);
  }

  toggle() {
    if (this.show) {
      this.show = false;
      this.showContent = false;
      this.$timeout(() => {
        this.opened = false;
      }, 300);
    } else {
      this.show = true;
      this.$timeout(() => {
        this.showContent = true;
        this.$timeout(() => this.opened = true, 300);
      }, 500);
    }
  }
}

export default angular.module('fabHeroTransition', [PaperIcon.name])
	.directive('fabHeroTransition', () => ({
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
    controllerAs: 'ctrl',
	}))
  .animation('.fab-animation', () => {

  });
