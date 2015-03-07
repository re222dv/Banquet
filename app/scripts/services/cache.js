
import {default as Storage, Lifetime} from './storage.js';

export const TIME = Object.freeze({
  ONE_MINUTE: 1000 * 60 * 10,
  TEN_MINUTES: 1000 * 60 * 10,
});

class Cache {

	constructor($http, rx, storage) {
    this.$http = $http;
    this.rx = rx;
    this.storage = storage;
  }

  /**
   * Send a http request only if the address isn't cached or if the cache time have passed.
   * Will always first respond with the cached version if it exists.
   *
   * @param reqConfig
   * @param options
   * @param {number} options.cacheTime Time to consider the cache fresh, defaults to ten minutes
   * @param {String} options.key Key to use when caching, default to the url of the request
   */
  request(reqConfig, options = {cacheTime: TIME.TEN_MINUTES, key: reqConfig.url}) {
    options.cacheTime = options.cacheTime || TIME.TEN_MINUTES;
    options.key = options.key || reqConfig.url;

    let subject = new this.rx.ReplaySubject(1);
    let cache = this.storage.get(options.key);

    if (cache) {
      subject.onNext(cache.data);
    }

    if (!cache || Date.now() - cache.timestamp > options.cacheTime) {
      this.$http(reqConfig)
        .then(({data}) => {
          if (data.status && data.status !== 'success') { throw data.message; }
          data = data.data;

          subject.onNext(data);
          this.storage.set(options.key, {timestamp: Date.now(), data}, Lifetime.Unlimited);
        })
        .catch(subject.onError)
        .finally(() => {
          subject.onCompleted();

          if (!subject.isDisposed) {
            subject.dispose();
          }
        });
    } else {
      subject.onCompleted();

      setTimeout(subject.dispose, 0);
    }

    return subject.asObservable();
  }
}

export default angular.module('cache', ['rx', Storage.name])
	.service('cache', Cache );
