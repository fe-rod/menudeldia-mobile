// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('todayMenu', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
//    if (window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$compileProvider) {

$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  // Each tab has its own nav history stack:
      .state('app.map-location', {
          url: '/maplocation',
          views: {
              'menuContent': {
                  templateUrl: 'templates/map/mapLocation.html',
                  controller: 'MapLocationCtrl'
              }
          }
      })
      .state('app.menus', {
          url: '/menus',
          views: {
              'menuContent': {
                  templateUrl: 'templates/menus/tab-menus.html',
                  controller: 'MenusCtrl'
              }
          }
      })
      .state('app.menu-detail', {
          url: '/menu/:menuId',
          views: {
              'menuContent': {
                  templateUrl: 'templates/menus/menuDetail.html',
                  controller: 'MenuDetailCtrl'
              }
          },
          resolve: {
              data: function (Menus,$stateParams, $ionicLoading) {
                  $ionicLoading.show({delay: 500});
                  return Menus.get($stateParams.menuId).then(function(data){
                      $ionicLoading.hide();
                      return data;
                  });
              }
          }
      })
      .state('app.stores', {
          url: '/stores',
          views: {
              'menuContent': {
                  templateUrl: 'templates/stores/tab-stores.html',
                  controller: 'StoresCtrl'
              }
          }
      })
      .state('app.restaurants', {
          url: '/restaurants',
          views: {
              'menuContent': {
                  templateUrl: 'templates/restaurants/tab-restaurants.html',
                  controller: 'RestaurantsCtrl'
              }
          }
      })
      .state('app.store-detail', {
          url: '/store/:storeId/:distance',
          views: {
              'menuContent': {
                  templateUrl: 'templates/stores/store-detail.html',
                  controller: 'StoreDetailCtrl'
              }
          },
          resolve: {
              data: function (Stores,$stateParams, $ionicLoading) {
                  $ionicLoading.show({delay: 500});
                  return Stores.getById($stateParams.storeId).then(function(data){
                      $ionicLoading.hide();
                      return data;
                  }); }
          }
      })
      .state('app.restaurant-detail', {
          url: '/restaurant/:restaurantId',
          views: {
              'menuContent': {
                  templateUrl: 'templates/restaurants/restaurant-detail.html',
                  controller: 'StoreDetailCtrl'
              }
          },
          resolve: {
              data: function (Stores,$stateParams, $ionicLoading) {
                  $ionicLoading.show({delay: 500});
                  return Stores.getRestaurantById($stateParams.restaurantId).then(function(data){
                      $ionicLoading.hide();
                      return data;
                  }); }
          }
      })

      .state('app.menuMap', {
          url: '/menuMap/:latitude/:longitude',
          views: {
              'menuContent': {
                  templateUrl: 'templates/map/map.html',
                  controller: 'MapCtrl'
              }
          }
      })
      .state('app.storeMap', {
          url: '/storeMap/:latitude/:longitude',
          views: {
              'menuContent': {
                  templateUrl: 'templates/map/map.html',
                  controller: 'MapCtrl'
              }
          }
      })
      .state('app.restaurantMap', {
          url: '/restaurantMap/:latitude/:longitude',
          views: {
              'menuContent': {
                  templateUrl: 'templates/map/map.html',
                  controller: 'MapCtrl'
              }
          }
      })
      .state('app.account', {
          url: '/account',
          views: {
              'menuContent': {
                  templateUrl: 'templates/account/tab-account.html',
                  controller: 'AccountCtrl'
              }
          }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/menus');
  
  $ionicConfigProvider.scrolling.jsScrolling(false);

  $ionicConfigProvider.platform.ios.backButton.text('Volver');

})
.constant('appConfig',
    {
        ver: '1.0.0',
        //apiUrl: "http://localhost:45291/api/"
        apiUrl: "http://mddservice.azurewebsites.net/api/"
    }
);
