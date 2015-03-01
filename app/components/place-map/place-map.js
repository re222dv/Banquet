'use strict';

class PlaceMap {
	constructor() {
    this.center = { latitude: 0, longitude: 0 };
    this.zoom = 14;
    this.opened = false;

    this.events = {
      tilesloaded: map => google.maps.event.trigger(map, 'resize')
    };
  }
}

export default angular.module('placeMap', ['uiGmapgoogle-maps'])
	.directive('placeMap', function() {
		return {
			templateUrl: 'components/place-map/place-map.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        places: '=',
        opened: '=',
			},
			bindToController: true,
			controller: PlaceMap ,
			controllerAs: 'ctrl'
		};
	});
