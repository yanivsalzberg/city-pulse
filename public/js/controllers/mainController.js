app.controller('mainController', function($scope, apiFactory, $http) {

  $scope.city = 'New York';
  $scope.coord = {};

  //search triggered on button click
  $scope.search = function(city) {
   console.log(city);

    // give the searched city to our friend getCityInfo in the factory
    apiFactory.getCityInfo(city).then(function (allData) {
      // data is returned as an array of objects - one for each api database
      $scope.fourDB = allData[0].groups[0].items;
      $scope.photoDB = allData[1].photos.photo;
      $scope.weatherDB = allData[2];
      setBackground($scope.weatherDB);
    });

    var params = {
    q: $scope.city,
    count: 5,
    result_type: 'popular recent',
    lang: 'en',
/*    lat: $scope.coord.lat,
    long: $scope.coord.lon*/
    //geocode: '40.7,-74.01,100mi'
    //geocode: $scope.coord.lat $scope.coord.lon 50mi
    }

    $http.post('/api/tweets', params)
      .then(function (result) {
        $scope.tweets = result.data;
      }, function(err) {
        console.log(err);
    })
  }

  /* Background color is based on temperature */
  var setBackground = function(weatherDB) {
    var temp = weatherDB.main.temp;
    var colorScale = d3.scaleLinear().domain([0, 50, 100]).range(['#1e3c72', '#6190E8', '#DC2424']);
    /*var bgColor = d3.interpolateRdYlBu(colorScale(temp));
    var bgColor1 = d3.interpolateRdYlBu(colorScale(temp+20));*/
    var bgColor = colorScale(temp);
    var bgColor1 = colorScale(temp+10);
    d3.select('.top-section').style('background', 'linear-gradient(to bottom,'+ bgColor + ',' + bgColor1);
    }

//* Tweet stuff */
  $scope.tweets=[]
  $scope.search($scope.city);

});