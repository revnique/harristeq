harristeqApp.controller('dorbaPhoneController', function($scope, harristeqSvc) {

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

    $scope.getDorbaData = harristeqSvc.getTrailInfoNew().then(function(results) {
        $scope.dorbaData = results;
        console.log("dorbaData", results);
        $scope.flatTrails = _.map($scope.dorbaData.trails, function (field) {
            field.trail.isExpanded = false;
            return field.trail;
        });

        console.log("$scope.flatTrails", $scope.flatTrails);




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

    $scope.currentLatitude = "32.761195";
    $scope.currentLongitude = "-97.278058";


    $scope.init = function () {
        $scope.getTrailMetadata($scope.dorbaData);

        $(window).resize(this.onResize);
        this.onResize();
        window.addEventListener("orientationchange", this.onOrientationChange);


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


    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };


    $scope.init();
});