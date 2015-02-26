/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.nerbyPlaces = element(by.css('nerby-places'));
  this.cards = this.nerbyPlaces.all(by.css('md-card'));
  //this.imgEl = this.jumbEl.element(by.css('img'));
  //this.thumbnailEls = element(by.css('body')).all(by.repeater('awesomeThing in awesomeThings'));
};

module.exports = new MainPage();
