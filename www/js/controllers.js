angular.module('hymnApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal



  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}

)
.controller('PlaylistsCtrl', function($scope,$http) {
  $scope.playlists = [];

  if(ionic.Platform.isIOS()) {
    $http.get("json/hymns.json").then(function (res) {
      //$http.get("/android_asset/www/json/hymns.json").then(function (res) {
      console.log("****************************" + angular.fromJson(res.data));
      var result = angular.fromJson(res.data);
      $scope.playlists = result;
    })
  }
  else if(ionic.Platform.isAndroid()){
    $http.get("/android_asset/www/json/hymns.json").then(function (res) {
      console.log("****************************" + angular.fromJson(res.data));
      var result = angular.fromJson(res.data);
      $scope.playlists = result;
    })
  }

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
      //hymnNumber/:hymnTitle/:hymnContent/:hymnHeaderNumber
      $scope.hymnTitle=$stateParams.hymnTitle;
      $scope.hymnNumber=$stateParams.hymnNumber;
      $scope.hymnHeaderNumber=$stateParams.hymnHeaderNumber;
      $scope.hymnContent=$stateParams.hymnContent;
console.log("selectetion done");
})
    .controller('PrayerListCtrl',function($scope){
      $scope.prayerMainList =[
        {prayerName:"SAMU DZADAVIDI",urlname:"samu"},{prayerName:" BERNARD MIZEKI GUILD SERVICE BOOK",urlname:"bmc"}
      ]

    })
    .controller('SamuCtrl',function($scope,$http){

      $scope.samuList=[];

      if(ionic.Platform.isIOS()) {
        $http.get("json/samu.json").then(function (res) {
          console.log("****************************" + angular.fromJson(res.data));
          var result = angular.fromJson(res.data);
          $scope.samuList = result;
        })
      }
      else if(ionic.Platform.isAndroid()){
        $http.get("/android_asset/www/json/samu.json").then(function (res) {
          console.log("****************************" + angular.fromJson(res.data));
          var result = angular.fromJson(res.data);
          $scope.samuList = result;
        })
      }

      console.log("samu list clicked "+$scope.samuList.length);
    })
    .controller('BmcCtrl',function($scope,$http){
$scope.bmgPrayersList=[];

      if(ionic.Platform.isIOS()) {
        $http.get("json/bmgmunamato.json").then(function (res) {
          console.log("****************************" + angular.fromJson(res.data));
          var result = angular.fromJson(res.data);
          $scope.bmgPrayersList = result;
        })
      }
      else if(ionic.Platform.isAndroid()){
        $http.get("/android_asset/www/json/bmgmunamato.json").then(function (res) {
          console.log("****************************" + angular.fromJson(res.data));
          var result = angular.fromJson(res.data);
          $scope.bmgPrayersList = result;
        })
      }

    })


    .controller('SamuSelectionCtrl', function($scope, $stateParams) {
      //hymnNumber/:hymnTitle/:hymnContent/:hymnHeaderNumber
      $scope.samuTitle=$stateParams.samuTitle;
      $scope.samuContent=$stateParams.samuContent;

      console.log("samu selectetion done" +$stateParams.samuContent);
    })
    .controller('HomeCtrl',function($scope){
     $scope.homeList=[
       {
         homeitemname:'Hymns',homeitemurl:'app.playlists',iconname:'ion-music-note'
       },
       {
         homeitemname:'Prayers',homeitemurl:'app.prayers',iconname:'ion-ios-book'
       }
     ]
    })
;
