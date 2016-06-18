import fetch from 'isomorphic-fetch'

if(!process.env.API_KEY) {
  var env = require('./../../env.js')
}

export function fetchData(searchTerm) {
  return fetch('http://capitolwords.org/api/1/dates.json?phrase=' + searchTerm + '&mincount=0&percentages=false&granularity=year&apikey=' + process.env.API_KEY)
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
