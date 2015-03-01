'use strict';

class PlaceMap {
	constructor($scope) {
    this.center = { latitude: 16, longitude: 56 };
    this.zoom = 14;

    this.events = {
      tilesloaded: map => this.map = map
    };

    $scope.$watch('ctrl.opened', (opened) => {
      if (!this.map || !opened) return;
      window.google.maps.event.trigger(this.map, 'resize')
    });
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
