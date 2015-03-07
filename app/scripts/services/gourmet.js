'use strict';

import {default as Cache, TIME} from './cache.js';
import {default as Storage, Lifetime} from './storage.js';

class Gourmet {
	constructor($http, rx, cache, storage) {
    this.$http = $http;
    this.rx = rx;
    this.cache = cache;
    this.storage = storage;

    this.url = 'http://localhost:3000/v1';
    this.key = 'b78d6ee724ccc781c8db08d37a375013';

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
        Key: this.key,
        Username: this._auth.email,
        Password: this._auth.password,
      },
    };

    return this.$http(req)
      .then(data => {
        data = data.data;
        if (data.status && data.status !== 'success') { throw data.message; }
        return data.data;
      });
  }

  get(path, cacheKey = null, cacheTime = TIME.TEN_MINUTES) {
    var req = {
      method: 'GET',
      url: `${this.url}${path}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Key: this.key,
      },
    };

    return this.cache.request(req, {key: cacheKey || req.url, cacheTime});
  }

  post(path, data) {
    return this.req('POST', path, data);
  }

  placesNear(lat, long, query = '') {
    let path =`/places?query=${query}&location=${lat},${long}`;
    if (query.length) {
      return this.req('GET', path)
    }
    return this.get(path, 'nerbyPlaces', TIME.ONE_MINUTE);
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

export default angular.module('gourmet', ['rx', Cache.name, Storage.name])
	.service('gourmet', Gourmet);
