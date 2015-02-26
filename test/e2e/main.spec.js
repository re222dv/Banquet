'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3001');
    page = require('./main.po.js');
  });

  it('should show nerby places', function() {
    //expect(page.h1El.getText()).toBe('\'Allo, \'Allo!');
    //expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    //expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
    expect(page.nerbyPlaces).not.toBeNull();
    expect(page.cards.count()).toBeGreaterThan(3);
  });

  it('should ', function () {
    expect(page.thumbnailEls.count()).toBeGreaterThan(5);
  });
});
