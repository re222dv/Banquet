'use strict';

function HeroOnClick(scope, element) {
  element.on('click', () => {
    let heroes = element[0].querySelectorAll('[hero-id]');
    Array.prototype.forEach.call(heroes, hero => hero.classList.add('hero'));
  });
}

export default angular.module('heroOnClick', [])
  .directive('heroOnClick', () => ({
    restrict: 'A',
    link: HeroOnClick,
  }));
