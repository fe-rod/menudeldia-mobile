angular.module('todayMenu')

    .controller('MapLocationCtrl', function($scope, $stateParams, $ionicLoading, $compile) {
        function initialize() {
            var myLatlng = new google.maps.LatLng(-34.8899629,-56.1611492);

            var mapOptions = {
                center: myLatlng,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                options: {zoomControl: false, streetViewControl: false, mapTypeControl: false}
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
//            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
//            var compiled = $compile(contentString)($scope);
//
//            var infowindow = new google.maps.InfoWindow({
//                content: compiled[0]
//            });

//            var marker = new google.maps.Marker({
//                position: myLatlng,
//                map: map,
//                title: 'Uluru (Ayers Rock)'
//            });

//            google.maps.event.addListener(marker, 'click', function() {
//                infowindow.open(map,marker);
//            });
//
//        $scope.map = map;
        }
        ionic.Platform.ready(initialize);
    });


