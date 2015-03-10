'use strict';

import {default as Storage, Lifetime} from '../services/storage.js';

let _storage;

function makeHero(element) {
  let heroes = element[0].querySelectorAll('[hero-id]');
  Array.prototype.forEach.call(heroes, hero => hero.classList.add('hero'));
}

function HeroOnClick(scope, element, attrs) {
  if (attrs.heroOnClick) {
    let oldHero = _storage.get('heroOnClick');

    if (oldHero === attrs.heroOnClick) {
      makeHero(element);
    }
  }
  element.on('click', () => {
    if (attrs.heroOnClick) {
      _storage.set('heroOnClick', attrs.heroOnClick, Lifetime.Session);
    }
    makeHero(element);
  });
}

export default angular.module('heroOnClick', [Storage.name])
  .directive('heroOnClick', (storage) => {
    _storage = storage;
    return {
      restrict: 'A',
      link: HeroOnClick,
    };
  });
