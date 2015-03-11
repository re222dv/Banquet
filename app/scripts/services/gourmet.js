'use strict';

import {default as Cache, TIME} from './cache.js';
import {default as Storage, Lifetime} from './storage.js';

/**
 * A service for accessing the Gourmet API
 */
class Gourmet {
  /**
   * @param $http
   * @param {Rx} rx
   * @param {Cache} cache
   * @param {Storage} storage
   */
	constructor($http, rx, cache, storage) {
    this.$http = $http;
    this.rx = rx;
    this.cache = cache;
    this.storage = storage;

    this.url = 'http://localhost:3000/v1';
    this.key = 'b78d6ee724ccc781c8db08d37a375013';

    storage.observe('auth', {}).subscribe(auth => this._auth = auth);
  }

  get signedIn() {
    return this._auth.email;
  }

  allPlaces() {
    return this._get('/places', null, TIME.ONE_MINUTE);
  }

  /**
   * Gets the latest review by getting the latest changed places and
   * then getting there latest reviews
   *
   * @returns {Rx.Observable}
   */
  latestReviews() {
    return this.allPlaces()
      .flatMap(page => page.items)
      .flatMap(place => this.place(place.id))
      .flatMap(place => place.reviews.map(review => ({
        id: review.id,
        place_id: review.place_id,
        place: place,
        timestamp: Date.parse(review.updated_at),
        updated_at: review.updated_at,
        description: review.description,
        user: review.user,
        rating: review.rating,
      })))
      .take(15)
      .reduce((all, current) => all.concat(current), []);
  }

  /**
   * Searches for places near the coordinates specified.
   * This endpoint is cached if no query is specified.
   *
   * @param {number} lat
   * @param {number} long
   * @param {String} query
   * @returns {Rx.Observable}
   */
  placesNear(lat, long, query = '') {
    let path;
    if (!lat || !long) {
      path =`/places?query=${query}`;
    } else {
      path =`/places?query=${query}&location=${lat},${long}`;
    }
    if (query.length) {
      return this.rx.fromPromise(this._req('GET', path));
    }
    return this._get(path, 'nerbyPlaces', TIME.ONE_MINUTE);
  }

  /**
   * Request a place detail object from the API.
   * This endpoint is cached.
   *
   * @param {String|number} id
   * @param {bool} cache If the cache should be used
   * @returns {Rx.Observable}
   */
  place(id, cache = true) {
    return this._get(`/places/${id}`, null, (cache) ? TIME.TEN_MINUTES : 0.1);
  }

  createReview(placeId, review) {
    return this._post(`/places/${placeId}/reviews`, review);
  }

  deleteReview(placeId, reviewId) {
    return this._req('DELETE', `/places/${placeId}/reviews/${reviewId}`);
  }

  editReview(placeId, review) {
    return this._req('PUT', `/places/${placeId}/reviews/${review.id}`, review);
  }

  user(id) {
    return this._get(`/users/${id}`);
  }

  signIn(email, password) {
    this._auth = {email, password};

    return this._post('/places', {})
      .catch((e) => {
        if (e.status === 401) {
          throw false;
        }
        this.storage.set('auth', {email, password}, Lifetime.Session);
        return true;
      });
  }

  signUp(email, password) {
    return this._post('/users', {
      name: email,
      password
    })
      .then(response => {
        this.storage.set('auth', {email, password}, Lifetime.Session);
        return response;
      });
  }

  /**
   * Make a HTTP request against the API
   *
   * @param {String} method HTTP method to use
   * @param {String} path The path to request against
   * @param data Optional body oth the request
   * @returns {Promise}
   * @private
   */
  _req(method, path, data = undefined) {
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

  /**
   * Makes a cached GET request to the API.
   * Will always return a cached response if it exists. The the cached data is no longer fresh it
   * will also return fresh data.
   *
   * @param {String} path The path to GET
   * @param {String} cacheKey The key to use for storing in the cache, default to the URL
   * @param {number} cacheTime The time to consider the cache fresh, default to ten minutes
   * @returns {Rx.Observable}
   * @private
   */
  _get(path, cacheKey = null, cacheTime = TIME.TEN_MINUTES) {
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

  _post(path, data) {
    return this._req('POST', path, data);
  }
}

export default angular.module('gourmet', ['rx', Cache.name, Storage.name])
	.service('gourmet', Gourmet);
