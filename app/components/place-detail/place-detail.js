'use strict';

import FabHeroTransition from '../fab-hero-transition/fab-hero-transition.js';
import LongclickMenu from '../longclick-menu/longclick-menu.js';
import StarRating from '../star-rating/star-rating.js';
import WriteReview from '../write-review/write-review.js';

class PlaceDetail {
	constructor($mdDialog, gourmet) {
    this.$mdDialog = $mdDialog;
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

    // NOTE: Created from here as it's is passed to write-review
    // and this would otherwise be messed up
    this.createReview = (review) => {
      this.gourmet.createReview(this.id, review)
        .then(() => this.updatePlace());
    };

    this.editReview = (review) => {
      this.gourmet.editReview(this.id, review)
        .then(() => this.updatePlace());
    };
  }

  deleteReview(reviewId, $event) {
    let dialog = this.$mdDialog.confirm()
      .title('Delete Review')
      .content('Do you really want to delete this review?')
      .ok('yes')
      .cancel('no')
      .targetEvent($event);

    this.$mdDialog
      .show(dialog)
      .then(() => this.gourmet.deleteReview(this.id, reviewId))
      .then(() => this.updatePlace());
  }

  updatePlace() {
    this.gourmet.place(this.id, false)
      .subscribe(place => {
        this.newReview = false;
        this.place = place;
        this.places = [place];
      });
  }
}

export default angular.module('placeDetail', [
  'ngMaterial', 'yaru22.angular-timeago',
  FabHeroTransition.name, LongclickMenu.name, StarRating.name, WriteReview.name
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
