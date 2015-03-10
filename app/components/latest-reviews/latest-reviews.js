'use strict';

import Gourmet from '../../scripts/services/gourmet.js';

class LatestReviews {
	constructor($timeout, gourmet) {
    gourmet.latestReviews()
      .subscribe(reviews => {
        $timeout(() => this.reviews = reviews);
      });
  }
}

export default angular.module('latestReviews', [Gourmet.name])
	.directive('latestReviews', () => ({
    templateUrl: 'components/latest-reviews/latest-reviews.html',
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
    controller: LatestReviews ,
    controllerAs: 'ctrl',
	}));
