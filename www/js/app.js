// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hymnApp', ['ionic', 'hymnApp.controllers'])

.run(function($ionicPlatform,$ionicPopup) {
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

    var admob_key =  ionic.Platform.isAndroid()? "ca-app-pub-9678945537214962/4353420176" : "ca-app-pub-9678945537214962/3012517379";
    admobid = { // for Android
      banner: admob_key
    };
    if(AdMob){
      AdMob.createBanner(
        {
          adId:admobid.banner,
          position:AdMob.AD_POSITION.BOTTOM_CENTER,
          isTesting: false,
          autoShow:true
        }
      );
      //ca-app-pub-9678945537214962/1256582575
      var admob_key_interstial =  ionic.Platform.isAndroid()? "ca-app-pub-9678945537214962/1285105377" : " ca-app-pub-9678945537214962/2761838573";

      AdMob.prepareInterstitial({
        adId: admob_key_interstial,
        isTesting: false, // TODO: remove this line when release
        autoShow: true
      });

    }else {
      console.log("platform not found>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }


    FCMPlugin.getToken(
      function (token) {
       // console.log(token);
      },
      function (err) {
        //console.log('error retrieving token: ' + err);
      }
    );

    FCMPlugin.onNotification(
      function(data){
        console.log(JSON.stringify(data.messageNot));
        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          //console.log("=====================alert received =============if==="+JSON.stringify(data));
          showAlert(JSON.stringify(data.hymnMessage));
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.
         // console.log("=====================alert received =============else==="+JSON.stringify(data));
          showAlert(JSON.stringify(data.hymnMessage));
        }
      },
      function(msg){
       // console.log('onNotification callback successfully registered: ' + msg);
       // showAlert(JSON.stringify(msg));
      },
      function(err){
        console.log('Error registering onNotification callback: ' + err);
      }
    );



    var showAlert = function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Anglican Shona Hymns',
        template: data
      });

      alertPopup.then(function(res) {

      });
    };



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
