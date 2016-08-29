var myApp = angular.module('myApp', ['ngRoute']);
var selected = [];
var currentPet = [];

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/pet', {
      templateUrl: '/views/partials/pet.html',
      controller: "pickController"
    })
    .when('/favorites', {
      templateUrl: '/views/partials/favorites.html',
      controller: "favController"
    })
    .otherwise({
      redirectTo: '/pet'
    })
}]);

myApp.controller("pickController", ["$scope", "$http", function($scope, $http) {
  console.log("pickController working")
  var key = 'beb24f67911c3af4d528df369362a516';
  var baseURL = 'http://api.petfinder.com/';

  $scope.petOptions = [
    {name: "Barnyard animal", value: "barnyard"},
    {name: "Bird", value: "bird"},
    {name: "Cat", value: "cat"},
    {name: "Dog", value: "dog"},
    {name: "Horse", value: "horse"},
    {name: "Pig", value: "pig"},
    {name: "Reptile", value: "reptile"},
    {name: "Small furry animal", value: "smallfurry"}];



  $scope.changedValue = function(pet) {
    console.log(pet.value);
    selected = [];
    selected.push(pet.value);
    console.log(selected);
    $scope.getRandomPet(selected);
  }


  $scope.getRandomPet = function(selected) {
    var query = baseURL + 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + selected;
    query += '&output=basic';
    query += '&format=json';

    console.log('query: ', query);

    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(function(response) {
      $scope.animal = response.data.petfinder.pet;
      //currentPet.push($scope.animal);
      //console.log(currentPet);
    });
  }

}]);

myApp.controller('favController', ['$scope', '$http', function($scope, $http) {
  console.log("favController loading");

  $scope.getFavorites = function() {
    console.log("clicked favorites button");
    $http.get('/favorites').then(function (response) {
      console.log(response.data);
       $scope.favorites = response.data;
       console.log($scope.favorites);
       $scope.numOfFavs = response.data.length;
       console.log($scope.numOfFavs);
    });
  }

  $scope.postFavorite = function(pet) {
    console.log("clicked add to favorites");
    shortDesc = $scope.animal.description.$t.substring(0,99);
    console.log(shortDesc);
    petToSend = {pet_name: $scope.animal.name.$t,
                img_url: $scope.animal.media.photos.photo[2].$t,
                description: shortDesc}
    console.log(petToSend);
    $http.post('/favorites', petToSend).then(function (response) {
        console.log(response);
    });
  }


}]);



// myApp.controller("petController", ["$scope", "$http", function($scope, $http) {
//   var key = 'beb24f67911c3af4d528df369362a516';
//   var baseURL = 'http://api.petfinder.com/';
//   console.log(selected);
//
//   $scope.getRandomPet = function(selected) {
//     var query = baseURL + 'pet.getRandom';
//     query += '?key=' + key;
//     query += '&animal=' + selected;
//     query += '&output=basic';
//     query += '&format=json';
//
//     console.log('query: ', query);
//
//     var request = encodeURI(query) + '&callback=JSON_CALLBACK';
//
//     $http.jsonp(request).then(function(response) {
//       $scope.pet = response.data.petfinder.pet;
//
//     });
//   }

// }]);







// myApp.controller("petController", ["$scope", "$http", function($scope, $http) {
//   var key = 'beb24f67911c3af4d528df369362a516';
//   var baseURL = 'http://api.petfinder.com/';
//   console.log($scope.pet);
//
//   $scope.getRandomPet = function() {
//     var query = baseURL + 'pet.getRandom';
//     query += '?key=' + key;
//     query += '&animal=cat';
//     query += '&output=basic';
//     query += '&format=json';
//
//     console.log('query: ', query);
//
//     var request = encodeURI(query) + '&callback=JSON_CALLBACK';
//
//     $http.jsonp(request).then(function(response) {
//       $scope.pet = response.data.petfinder.pet;
//
//     });
//   }
//   $scope.getRandomPet();
// }]);
//
// myApp.controller("barnyardController", ["$scope", "$http", function($scope, $http) {
//   var key = 'beb24f67911c3af4d528df369362a516';
//   var baseURL = 'http://api.petfinder.com/';
//
//   $scope.getRandomPet = function() {
//     var query = baseURL + 'pet.getRandom';
//     query += '?key=' + key;
//     query += '&animal=barnyard';
//     query += '&output=basic';
//     query += '&format=json';
//
//     console.log('query: ', query);
//
//     var request = encodeURI(query) + '&callback=JSON_CALLBACK';
//
//     $http.jsonp(request).then(function(response) {
//       $scope.pet = response.data.petfinder.pet;
//
//     });
//   }
//   $scope.getRandomPet();
// }]);
//
// myApp.controller("smallfurryController", ["$scope", "$http", function($scope, $http) {
//   var key = 'beb24f67911c3af4d528df369362a516';
//   var baseURL = 'http://api.petfinder.com/';
//
//   $scope.getRandomPet = function() {
//     var query = baseURL + 'pet.getRandom';
//     query += '?key=' + key;
//     query += '&animal=smallfurry';
//     query += '&output=basic';
//     query += '&format=json';
//
//     console.log('query: ', query);
//
//     var request = encodeURI(query) + '&callback=JSON_CALLBACK';
//
//     $http.jsonp(request).then(function(response) {
//       $scope.pet = response.data.petfinder.pet;
//
//     });
//   }
//   $scope.getRandomPet();
// }]);
