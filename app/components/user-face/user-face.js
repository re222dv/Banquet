'use strict';

import Gourmet from '../../scripts/services/gourmet.js';

class UserFace {
	constructor($mdDialog) {
    this.loggedIn = false;
    this.$mdDialog = $mdDialog;
  }

  open($event) {
    this.$mdDialog.show({
      targetEvent: $event,
      templateUrl: 'components/user-face/login-dialog.html',
      controller: function(scope, $mdDialog) {
        scope.loading = false;

        scope.closeDialog = function() {
          $mdDialog.hide();
        };

        scope.signIn = function(email, password) {
          scope.loading = true;
        };

        scope.togglePage = function() {
          scope.signUp = !scope.signUp;
        };
      }
    });
  }
}

export default angular.module('userFace', ['ngMaterial', Gourmet.name])
	.directive('userFace', function() {
		return {
			templateUrl: 'components/user-face/user-face.html',
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
			controller: UserFace,
			controllerAs: 'ctrl'
		};
	});
