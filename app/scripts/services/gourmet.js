'use strict';

class Gourmet {
	constructor($http) {
    this.$http = $http;
    this.url = 'http://localhost:3000/v1';
  }

  get(path) {
    var req = {
      method: 'GET',
      url: `${this.url}${path}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Key: 'b78d6ee724ccc781c8db08d37a375013'
      },
    };

    return this.$http(req)
      .then(data => {
        data = data.data;
        if (data.status !== 'success') { throw data.message; }
        return data.data;
      });
  }

  placesNear(lat, long, query = '') {
    return this.get(`/places?query=${query}&location=${lat},${long}`);
  }

  place(id) {
    return this.get(`/places/${id}`);
  }
}

export default angular.module('gourmet', [])
	.service('gourmet', Gourmet );
