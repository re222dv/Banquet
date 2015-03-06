'use strict';

export var Lifetime = Object.freeze({
  Unlimited: 0,
  Session: 1,
  Instance: 2,
});

class Storage {
	constructor() {
    this.subjects = {};
  }

  set(key, value, lifetime = Lifetime.Instance) {
    switch (lifetime) {
      case Lifetime.Unlimited:
        window.localStorage.setItem(key, JSON.stringify(value));
        break;
      case Lifetime.Session:
        window.sessionStorage.setItem(key, JSON.stringify(value));
        break;
    }

    this._set(key, value);
  }

  has(key) {
    return !!this.subjects[key];
  }

  observe(key, defaultValue = null) {
    if (!this.subjects[key]) {
      let value = window.sessionStorage.getItem(key);
      if (value === null) {
        value = window.localStorage.getItem(key);
      }
      if (value === null) {
        value = defaultValue;
      } else {
        value = JSON.parse(value);
      }

      this._set(key, value);
    }

    return this.subjects[key].asObservable();
  }

  _set(key, value) {
    if (!this.subjects[key]) {
      this.subjects[key] = new Rx.ReplaySubject(1);

      if (value !== null) {
        this.subjects[key].onNext(value);
      }
    } else {
      this.subjects[key].onNext(value);
    }
  }
}

export default angular.module('storage', [])
	.service('storage', Storage );
