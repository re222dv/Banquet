'use strict';

import FabHeroTransition from '../fab-hero-transition/fab-hero-transition.js';
import StarRating from '../star-rating/star-rating.js';
import WriteReview from '../write-review/write-review.js';

class PlaceDetail {
	constructor(gourmet) {
    this.gourmet = gourmet;

    this.place = {
      // NOTE: U+2007 Figure space to make element take correct size until data is ready
      name: ' ',
      description: ' ',
      rating: ' ',
      street: ' ',
    };
    this.newReview = false;

    gourmet.place(this.id)
      .subscribe(place => {
        this.place = place;
        this.places = [place];
      });

    this.createReview = (review) => {
      this.gourmet.createReview(this.id, review)
        .then(() =>
          gourmet.place(this.id, false)
            .subscribe(place => {
              this.newReview = false;
              this.place = place;
              this.places = [place];
            }));
    };
  }
}

export default angular.module('placeDetail', [
  'yaru22.angular-timeago', FabHeroTransition.name, StarRating.name, WriteReview.name
])
	.directive('placeDetail', () => ({
    templateUrl: 'components/place-detail/place-detail.html',
    restrict: 'E',
    scope: {
      // Specify attributes where parents can pass and receive data here
      // Syntax name: 'FLAG'
      // FLAGS:
      // = Two way data binding
      // @ One way incoming expression (like placeholder)
      // & One way outgoing behaviour (like ng-click)
      id: '@'
    },
    bindToController: true,
    controller: PlaceDetail ,
    controllerAs: 'ctrl',
	}));
