'use strict';

import {default as Storage, Lifetime} from './storage.js';

class Gourmet {
	constructor($http, storage) {
    this.$http = $http;
    this.url = 'http://localhost:3000/v1';
    this.key = 'b78d6ee724ccc781c8db08d37a375013';

    this.storage = storage;
    storage.observe('auth', {}).subscribe(auth => this._auth = auth);
  }

  req(method, path, data) {
    var req = {
      method: method,
      url: `${this.url}${path}`,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Key: 'b78d6ee724ccc781c8db08d37a375013',
        Username: this._auth.email,
        Password: this._auth.password,
      },
    };

    return this.$http(req)
      .then(data => {
        data = data.data;
        if (data.status !== 'success') { throw data.message; }
        return data.data;
      });
  }

  get(path) {
    return this.req('GET', path);
  }

  post(path, data) {
    return this.req('POST', path, data);
  }

  placesNear(lat, long, query = '') {
    return this.get(`/places?query=${query}&location=${lat},${long}`);
  }

  place(id) {
    return this.get(`/places/${id}`);
  }

  signIn(email, password) {
    this._auth = {email, password};

    return this.post('/places', {})
      .catch((e) => {
        if (e.status === 401) {
          throw false;
        }
        this.storage.set('auth', {email, password}, Lifetime.Session);
        return true;
      });
  }

  signUp(email, password) {
    return this.post('/users', {
      name: email,
      password
    })
      .then(_ => {
        this.storage.set('auth', {email, password}, Lifetime.Session);
        return _;
      });
  }
}

export default angular.module('gourmet', [Storage.name])
	.service('gourmet', Gourmet);
