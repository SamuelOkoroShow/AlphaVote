var BASE_URL = 'https://dazzling-fire-2808.firebaseio.com/Alpha.json';  

var Api = {

  get() {
    return fetch(BASE_URL).then((res) => res.json());
  },
  post(url, body) {
    return fetch(BASE_URL + url, {
      method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  put(url, body) {
    return fetch(BASE_URL + url, {
      method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  delete(url) {
    return fetch(BASE_URL + url, { method: 'delete' }).then((res) => res.json());
  }
};

module.exports = Api;