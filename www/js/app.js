// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hymnApp', ['ionic', 'hymnApp.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
   if(window.plugins && window.plugins.AdMob) {
      var admob_key = "ca-app-pub-9678945537214962/4353420176";//device.platform == "Android" ? "ca-app-pub-9678945537214962/4353420176" : "ca-app-pub-9678945537214962/2737086171";
      var admob = window.plugins.AdMob;
      admob.createBannerView(
          {
            'publisherId': admob_key,
            'adSize': admob.AD_SIZE.BANNER,
            'bannerAtTop': false
          },
          function() {
            admob.requestAd(
                { 'isTesting': false },
                function() {
                  admob.showAd(true);
                },
                function() { console.log('failed to request ad'); }
            );
          },
          function() { console.log('failed to create banner view'); }
      );
  }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.prayers', {
      url: '/prayers',
      views: {
        'menuContent': {
          templateUrl: 'templates/prayersList.html',
          controller:'PrayerListCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

      .state('playlistsview', {
        url: '/playlistsview/:hymnNumber/:hymnTitle/:hymnContent/:hymnHeaderNumber',
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      })

      .state('samu', {
        url: '/samu',
        templateUrl: 'templates/samuList.html',
        controller: 'SamuCtrl'
      })
      .state('bmc', {
        url: '/bmc',
        templateUrl: 'templates/prayersBmcList.html',
        controller: 'BmcCtrl'
      })
      .state('bmcmunamato', {
        url: '/bmcmunamato/:samuTitle/:samuContent',
        templateUrl: 'templates/samuInfo.html',
        controller: 'SamuSelectionCtrl'
      })
      .state('samuSelection', {
        url: '/samuSelection/:samuTitle/:samuContent',
        templateUrl: 'templates/samuInfo.html',
        controller: 'SamuSelectionCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'templates/homeList.html',
        controller: 'HomeCtrl'
      })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
