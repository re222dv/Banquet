'use strict';

import PaperIcon from '../paper-icon/paper-icon.js';

class StarRating {
	constructor() {}
}

export default angular.module('starRating', [PaperIcon.name])
	.directive('starRating', () => ({
    templateUrl: 'components/star-rating/star-rating.html',
    restrict: 'E',
    scope: {
      // Specify attributes where parents can pass and receive data here
      // Syntax name: 'FLAG'
      // FLAGS:
      // = Two way data binding
      // @ One way incoming expression (like placeholder)
      // & One way outgoing behaviour (like ng-click)
      rating: '=',
    },
    bindToController: true,
    controller: StarRating ,
    controllerAs: 'ctrl',
	}));
