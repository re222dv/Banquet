'use strict';

import PaperIcon from '../paper-icon/paper-icon.js';

class StarRatingPicker {
	constructor() {}
}

export default angular.module('starRatingPicker', [PaperIcon.name])
	.directive('starRatingPicker', () => ({
    templateUrl: 'components/star-rating-picker/star-rating-picker.html',
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
    controller: StarRatingPicker ,
    controllerAs: 'ctrl',
	}));
