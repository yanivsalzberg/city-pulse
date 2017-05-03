app.service('apiFactory', function($http) {

var apiFactory = {};

    // Getting city data from our city route on the server
    apiFactory.getCityInfo = function(location) {
      return $http.get('/city/'+location ) // let's go to the server
        .then(function(response) {
            console.log(response.data);
            return response.data
        }, function(err) {
          console.log(err);
        });
    };

return apiFactory;

});