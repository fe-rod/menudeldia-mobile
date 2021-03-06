angular.module('todayMenu')

    .controller('MenusCtrl', function($scope, $rootScope, $stateParams, Menus, $ionicPopover, $cordovaGeolocation,
                                      $ionicLoading,$ionicPlatform, $log, $ionicModal, $cordovaDevice, $cordovaToast, Account) {
        const pageSize = 10;
        var pageCounter = 0;

        $rootScope.hideTabs = false;
        $rootScope.hideFilter = false;

        $scope.geolocError = false;

        $ionicLoading.show({delay:200, template: "Cargando menús cercanos..."});

        var latitude, longitude;

        $ionicPlatform.ready(function() {

            var posOptions = {timeout: 60000, enableHighAccuracy: true, maximumAge: 10000};
            return $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    Menus.all(pageCounter, pageSize, latitude, longitude)
                        .then(function (data) {
                            $scope.menus = data;
                            $scope.moreDataCanBeLoaded = (data.length == pageSize);
                            $ionicLoading.hide();
                        }, function () {
                            $ionicLoading.hide();
                        });

                }, function (err) {
                    $scope.geolocError = true;
                    //$scope.gpsError = err.code + ' - ' + err.message;
                    $ionicLoading.hide();
                });
        });

        $scope.favorite = function(menu){
            menu.favorite = !menu.favorite;
        };

        $ionicPopover.fromTemplateUrl('templates/menus/filterPopover.html', function(popover) {
            $rootScope.popover = popover;
        });

        $scope.loadMore = function() {
            pageCounter = pageCounter + 1;
            Menus.all(pageCounter,10, latitude, longitude).then(
                function(data){
                    $scope.moreDataCanBeLoaded = (data.length == pageSize);
                    if(data.length){
                        $scope.menus= $scope.menus.concat(data);
                        $scope.$broadcast('scroll.infiniteScrollComplete')
                    }
                }
            );
        };

        $scope.refreshMenu = function(){
            var posOptions = {timeout: 60000, enableHighAccuracy: true, maximumAge: 10000};
            pageCounter = 0;
            $ionicPlatform.ready(function() {
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    latitude  = position.coords.latitude
                    longitude = position.coords.longitude

                    Menus.all(pageCounter,pageSize, latitude, longitude).then(function(data){
                        $scope.menus = data;
                        $scope.moreDataCanBeLoaded = (data.length == pageSize);
                    },function(){
                    });
                }, function(err) {
                    //todo:mostrar mensaje indicando que no anda la geolocalizacion
                    $scope.geolocError = true;
                    $scope.gpsError = err.code + ' - ' + err.message;
                })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
            });
        }
        
        $ionicModal.fromTemplateUrl('templates/account/suggest.html', function($ionicModal) {
            $scope.suggestModal = $ionicModal;
            $scope.suggestions = {value: ''};
        }, {
            // Use our scope for the scope of the modal to keep it simple
            scope: $scope,
            // The animation we want to use for the modal entrance
            animation: 'slide-in-up'
        });
        
        $scope.sendSuggestions = function(){
            $scope.suggestModal.hide();
            $ionicPlatform.ready(function(){
                var id = $cordovaDevice.getUUID();
                Account.saveSuggestion($scope.suggestions.value, id).then(
                    function(data){
                        $scope.suggestions.value = '';
                        $cordovaToast.showLongBottom('Gracias por enviarnos tus comentarios').then(function(success) {
                            // success
                        }, function (error) {
                            // error
                        });
                    },
                    function(){
                    }
                );
           });
        }
    })
    .controller('MenuDetailCtrl', function($scope, $rootScope, $stateParams, Menus, data, $ionicLoading) {

        $scope.menu = data;
        $ionicLoading.hide();

        $rootScope.hideTabs = true;
        $rootScope.hideFilter = true;
    });


