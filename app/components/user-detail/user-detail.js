'use strict';

import Gourmet from '../../scripts/services/gourmet.js';

class UserDetail {
	constructor(gourmet) {
    gourmet.user(this.id)
      .subscribe(user => this.user = user);
  }
}

export default angular.module('userDetail', [Gourmet.name])
	.directive('userDetail', () => ({
    templateUrl: 'components/user-detail/user-detail.html',
    restrict: 'E',
    scope: {
      // Specify attributes where parents can pass and receive data here
      // Syntax name: 'FLAG'
      // FLAGS:
      // = Two way data binding
      // @ One way incoming expression (like placeholder)
      // & One way outgoing behaviour (like ng-click)
      id: '@',
    },
    bindToController: true,
    controller: UserDetail ,
    controllerAs: 'ctrl',
	}));
