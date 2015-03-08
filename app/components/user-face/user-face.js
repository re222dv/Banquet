'use strict';

import Gourmet from '../../scripts/services/gourmet.js';
import Storage from '../../scripts/services/storage.js';

class UserFace {
	constructor($mdDialog, gourmet, storage, $scope) {
    this.$mdDialog = $mdDialog;
    this.gourmet = gourmet;
    this.storage = storage;

    this.open = false;
    let subscription = storage.observe('auth').subscribe(({email}) => this.loggedIn = email);
    $scope.$on('$destroy', () => subscription.dispose());
  }

  signUp(email, password) {
    return this.gourmet.signUp(email, password);
  }

  signIn(email, password) {
    return this.gourmet.signIn(email, password);
  }

  signOut() {
    this.storage.set('auth', {});
  }

  dialog($event) {
    this.$mdDialog.show({
      targetEvent: $event,
      templateUrl: 'components/user-face/login-dialog.html',
      controller: (scope, $mdDialog) => {
        scope.invalid = false;
        scope.loading = false;
        scope.form = {};

        scope.closeDialog = () => $mdDialog.hide();
        scope.togglePage = () => scope.signUp = !scope.signUp;

        scope.submit = (form) => {
          scope.invalid = false;

          if (scope.signUp && scope.form.password !== scope.form.confirmation) {
            scope.form.user.confirmation.$setValidity('confirmation', false);
          }

          if (form.$valid) {
            scope.loading = true;
            var promise;

            if (scope.signUp) {
              promise = this.signUp(scope.form.email, scope.form.password);
            } else {
              promise = this.signIn(scope.form.email, scope.form.password)
                .catch(() => {
                  scope.invalid = true;
                });
            }

            promise
              .then(scope.closeDialog)
              .finally(() => scope.loading = false);
          }
        };

        scope.$watch('form.confirmation', (value) => {
          if (scope.form.user.confirmation) {
            scope.form.user.confirmation.$setValidity('confirmation', value === scope.form.password);
          }
        });
      }
    });
  }
}

export default angular.module('userFace', [
  'ngMaterial', 'ngMessages', Gourmet.name, Storage.name
])
	.directive('userFace', () => ({
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
    controllerAs: 'ctrl',
	}));
