'use strict';

describe('Directive: viewIndex', function() {

	// load the directive's module
	beforeEach(module('banquetApp'));

	var element,
		scope;

	beforeEach(inject(function($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function($compile) {
		element = angular.element('<view-index></view-index>');
		element = $compile(element)(scope);
		expect(element.text()).toBe('this is the <view-index> component');
	}));
});
