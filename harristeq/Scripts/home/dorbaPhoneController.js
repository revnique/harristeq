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
    }, function() {
        //fail goes here
    });

    $scope.currentLatitude = "32.761195";
    $scope.currentLongitude = "-97.278058";


    $scope.init = function () {

        //var d = $scope.getDorbaData;
        $scope.getTrailMetadata($scope.dorbaData);

        $(window).resize(this.onResize);
        this.onResize();
        window.addEventListener("orientationchange", this.onOrientationChange);


        var states = new Bloodhound({
            name: 'states',
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.trailName);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            // `states` is an array of state names defined in "The Basics"
            local:
            [
                {
             
                        "trailId": "29",
                        "trailName": "Tyler State Park",
                        "openClose": "Closed",
                        "currentStatus": "0",
                        "currentCondition": "4",
                        "conditionDesc": "Muddy",
                        "geoLat": "32.472478",
                        "geoLang": "-95.299187",
                        "trailCity": "Tyler",
                        "trailAddress": "789 Park Road 16 Tyler, TX 75706",

                        "landOwner": "Tyler State Park Call 903-592-6790 for latest trail conditions",
                        "facebook": "",
                        "twitter": "",
                        "updateFormatted": "Sun, Apr 19, 2015 @ 02:11 PM",
                        "trailCategory": "4",
                        "trailKML": null
             
                },
                {
                        "trailId": "30",
                        "trailName": "Windmill Hill Preserve",
                        "openClose": "Closed",
                        "currentStatus": "0",
                        "currentCondition": "4",
                        "conditionDesc": "Muddy",
                        "geoLat": "32.617280",
                        "geoLang": "-96.908369",
                        "trailCity": "DeSoto",
                        "trailAddress": "",

                        "landOwner": "",
                        "facebook": "",
                        "twitter": "",
                        "updateFormatted": "Mon, Apr 13, 2015 @ 01:46 PM",
                        "trailCategory": "2",
                        "trailKML": null
                 
                }
            ]
        });
        states.initialize();

        //$('#txtPhoneSearch').typeahead({
        //    hint: true,
        //    highlight: true,
        //    minLength: 1
        //},
        //{
        //    name: 'states',
        //    source: function(query, cb) {
        //        data.get(query, function(suggestions) {
        //            cb(filter(suggestions));
        //        });
        //    }
        //});

        $('#txtTabletSearch').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'states',
            source: states.ttAdapter()
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