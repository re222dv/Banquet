'use strict';

import StarRatingPicker from '../star-rating-picker/star-rating-picker.js';

class WriteReview {
	constructor() {
    this.rating = 3;
    this.review = null;

    if (this.initial) {
      this.review = this.initial.description;
      this.rating = this.initial.rating;
      this.id = this.initial.id;
    }
  }

  post() {
    if (this.form.$valid) {
      this.done({
        rating: this.rating,
        description: this.review,
        id: this.id,
      });
    }
  }
}

export default angular.module('writeReview', [StarRatingPicker.name])
	.directive('writeReview', () => ({
    templateUrl: 'components/write-review/write-review.html',
    restrict: 'E',
    scope: {
      // Specify attributes where parents can pass and receive data here
      // Syntax name: 'FLAG'
      // FLAGS:
      // = Two way data binding
      // @ One way incoming expression (like placeholder)
      // & One way outgoing behaviour (like ng-click)
      done: '=',
      heading: '@',
      initial: '=',
    },
    bindToController: true,
    controller: WriteReview ,
    controllerAs: 'ctrl',
	}));
