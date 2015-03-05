'use strict';

class Gourmet {
	constructor($http) {
    this.$http = $http;
    this.url = 'http://localhost:3000/v1';
    this.key = 'b78d6ee724ccc781c8db08d37a375013';
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
        Username: this.email,
        Password: this.password,
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
    this.email = email;
    this.password = password;
    return this.post('/places', {})
      .catch((e) => {
        if (e.status == 401) {
          throw false;
        }
        return true;
      });
  }

  signUp(email, password) {
    return this.post('/users', {
      name: email,
      password
    });
  }
}

export default angular.module('gourmet', [])
	.service('gourmet', Gourmet);
