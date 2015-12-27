harristeqApp.controller('dorbaPhoneController', function($scope, harristeqSvc, $http) {

    var Trail = function(id, name, address, mapLink, latitude, longitude, currentStatus) {
        var self = this;
        self.Name = name;
        self.ID = id;
        self.Address = address;
        self.MapLink = mapLink;
        self.Latitude = latitude;
        self.Longitude = longitude;
        self.CurrentStatus = currentStatus;
        return self;
    };


    $scope.trails = [];

    $scope.getTrailMetadata = function(data) {
        var trail;
        trail = new Trail("1", "Arbor Hills", "6701 W Parker Rd Plano, TX 75093", "http://maps.google.com/?q=33.05031+-96.850428", "33.05031", "-96.850428", 0);
        $scope.trails.push(trail);

        console.log("$scope.trails", $scope.trails);
        console.log("data", data);
    };

    $scope.predicate = 'trailName';
    $scope.reverse = false;

    $scope.getDorbaData = harristeqSvc.getTrailInfoNew().then(function(results) {
        $scope.dorbaData = results;
        var distance, startingLat, startingLong;
        startingLat = $scope.currentLatitude;
        startingLong = $scope.currentLongitude;

        //console.log("dorbaData", results);
        $scope.flatTrails = _.map($scope.dorbaData.trails, function (field) {
            //field.trail.isExpanded = false;
            field.trail.isExpanded = false;

            //console.log(field.trail.trailName + " lat", field.trail.geoLat);
            //console.log(field.trail.trailName + " long", field.trail.geoLang);

            distance = $scope.calculateDistance(startingLat, startingLong, parseFloat(field.trail.geoLat), parseFloat(field.trail.geoLang));
            //console.log(field.trail.trailName + " distance", distance);

            field.trail.distanceKm = distance;
            field.trail.distanceMi = distance * 0.621371192;

            return field.trail;
        });

        //console.log("$scope.flatTrails", $scope.flatTrails);

        var trailList = new Bloodhound({
            name: 'trailList',
            datumTokenizer: function (d) {
                return Bloodhound.tokenizers.whitespace(d.trailName);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            // `states` is an array of state names defined in "The Basics"
            local: $scope.flatTrails

        });
        trailList.initialize();

        $('#txtTabletSearch').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'trailList',
            source: trailList.ttAdapter(),
            displayKey: 'trailName'
        });

        $('#txtPhoneSearch').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'trailList',
            source: trailList.ttAdapter(),
            displayKey: 'trailName'
        });
    }, function() {
        //fail goes here
    });


    $scope.getLocationData = function (geoLat, geoLang) {
        harristeqSvc.getLocationData(geoLat, geoLang).then(function(results) {
            $scope.locationData = results;

            if (results != null) {
                $scope.geoCity = results.postalCodes[0].placeName;
                $scope.geoState = results.postalCodes[0].adminCode1;
            }

        }, function() {
            //fail goes here
        });
    };

    $scope.useMiles = false;

    $scope.calculateDistance = function(lat1, lon1, lat2, lon2) {
        //dlon = lon2 - lon1 
        //dlat = lat2 - lat1 
        //a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2 
        //c = 2 * atan2( sqrt(a), sqrt(1-a) ) 
        //d = R * c (where R is the radius of the Earth)
        //3961 miles & 6373 km

        /** Converts numeric degrees to radians */
        if (typeof (Number.prototype.toRadians) === "undefined") {
            Number.prototype.toRadians = function () {
                return this * Math.PI / 180;
            }
        }
        var R = $scope.useMiles ? 3961 : 6373;
        var φ1 = lat1.toRadians();
        var φ2 = lat2.toRadians();
        var Δφ = (lat2 - lat1).toRadians();
        var Δλ = (lon2 - lon1).toRadians();

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;
        return d;
    };

    //coeur d'alene, id
    $scope.currentLatitude = 47.699111;
    $scope.currentLongitude = -116.790272;
    //47.543141, -116.236492


    var getLocationSuccess = function(location) {
        $scope.currentLatitude = location.coords.latitude;
        $scope.currentLongitude = location.coords.longitude;
        $scope.getLocationData($scope.currentLatitude, $scope.currentLongitude);
    }
    var errorHandler = function(error) {
        alert("Attempt to get location failed: " + error.message + "\nGoing to use Coeur d'Alene, ID as your current location instead.");
    }

    $scope.init = function () {
        navigator.geolocation.getCurrentPosition(getLocationSuccess, errorHandler);
        $scope.getTrailMetadata($scope.dorbaData);

        $(window).resize(this.onResize);
        this.onResize();
        window.addEventListener("orientationchange", this.onOrientationChange);


        // Get the data as normal which will automatically be turned into a single HTTP request
        $http.get('http://localhost:49977/api/demo/27').then(function (data) {
            console.log('success 0 - ', data.data);
        }, function (err) {
            console.log('error 0 - ', err);
        });

        $http.get('http://localhost:49977/api/demo/').then(function (data) {
            console.log('success 1 - ', data.data);
        }, function (err) {
            console.log('error 1 - ', err);
        });


    };





    $scope.onResize = _.debounce(function() {
        var h, w;
        w = $(window).innerWidth();
        h = $(window).innerHeight();
        return $scope.resize(w, h);
    }, 250);

    $scope.onOrientationChange = function() {
        if (window.orientation === 0) {
        } else {
        }
    };

    $scope.resize = function(w, h) {
        return;
    };



    var addZero = function(number) {
        var rtn = number + "";
        if (number < 10) {
            rtn = "0" + rtn;
        }
        return rtn;
    };

    $scope.loadedTime = function() {
        var rtn = "This page loaded : ";
        var dt = new Date();
        var m = dt.getMonth() + 1;
        var d = addZero(m) + "/" + addZero(dt.getDate()) + "/" + dt.getFullYear() + " " + addZero(dt.getHours()) + ":" + addZero(dt.getMinutes()) + ":" + addZero(dt.getSeconds());

        rtn += d;
        return rtn;
    };
    $scope.showLoading = false;
    $scope.showError = false;


    $scope.isSearchOpen = false;


    $scope.init();
});