import fetch from 'isomorphic-fetch'

export function fetchData(phrase) {
  return fetch('/searching/' + phrase)
    .then(function(data){
      return data.status >= 400
        ? Promise.reject(data)
        : data
    })
    .then(function(data){
      return data.json()
    })
    .then(function(jsonData){
      return jsonData.results
    })
}
