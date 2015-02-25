'use strict';

export default angular.module('heroOnClick', [])
  .directive('heroOnClick', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.on('click', () => {
          let heros = element[0].querySelectorAll('[hero-id]');
          Array.prototype.forEach.call(heros, hero => hero.classList.add('hero'));
        });
      }
    };
  });
