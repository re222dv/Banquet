'use strict';

import FabHeroTransition from '../fab-hero-transition/fab-hero-transition.js';
import PaperIcon from '../paper-icon/paper-icon.js';
import StarRating from '../star-rating/star-rating.js';
import HeroOnClick from '../../scripts/directives/hero-on-click.js';
import Gourmet from '../../scripts/services/gourmet.js';

class NerbyPlaces {
	constructor($scope, $window, observeOnScope, gourmet) {
    this.gourmet = gourmet;
    this.places = [];
    this.search = '';

    observeOnScope($scope, 'ctrl.search')
      .debounce(250)
      .subscribe(this.filter.bind(this));

    $window.navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.filter();
    }, () => {
      this.latitude = null;
      this.longitude = null;
      this.filter();
    });
  }

  filter() {
    if (this.latitude === undefined || this.longitude === undefined) { return; }

    return this.gourmet.placesNear(this.latitude, this.longitude, this.search)
      .subscribe(places => this.places = places);
  }
}

export default angular.module('nerbyPlaces', [
  'ngMaterial', 'rx', 'ui.router',
  FabHeroTransition.name, Gourmet.name, HeroOnClick.name, PaperIcon.name, StarRating.name
])
	.directive('nerbyPlaces', () => ({
    templateUrl: 'components/nerby-places/nerby-places.html',
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
    controller: NerbyPlaces ,
    controllerAs: 'ctrl',
	}));
