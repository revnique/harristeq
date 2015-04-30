harristeqApp.controller('dorbaPhoneController', function ($scope, harristeqSvc) {

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

    $scope.getTrailMetadata = function (data) {
        var trail;
        trail = new Trail("1", "Arbor Hills", "6701 W Parker Rd Plano, TX 75093", "http://maps.google.com/?q=33.05031+-96.850428", "33.05031", "-96.850428", 0);
        $scope.trails.push(trail);
        
        console.log("$scope.trails", $scope.trails);
        console.log("data", data);
    };


    $scope.currentLatitude = "32.761195";
    $scope.currentLongitude = "-97.278058";
        



    $scope.init = function() {
        var d = $scope.getJsBin;
        $scope.getTrailMetadata($scope.dorbaData);

        $(window).resize(this.onResize);
        this.onResize();
        window.addEventListener("orientationchange", this.onOrientationChange);
    };

    $scope.onResize = _.debounce(function () {
        var h, w;
        w = $(window).innerWidth();
        h = $(window).innerHeight();
        return $scope.resize(w, h);
    }, 250);

    $scope.onOrientationChange = function () {
        if (window.orientation === 0) {
        } else {
        }
    };

    $scope.resize = function(w, h) {
        return;
    };


    $scope.getJsBin = harristeqSvc.getTrailInfoNew().then(function (results) {
        $scope.dorbaData = results;
    }, function () {
        //fail goes here
    });

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



    $scope.onMenuClick = function (e) {
        var self = this;
        this.$mobileMenu = $("#mobile-menu");

        if ($("body").hasClass("search-open")) {
            $scope.onSearchClose();
        }

        if ($("body").hasClass("menu-open")) {
            $("body").removeClass("menu-open");

            setTimeout(function () {
                if (self.$mobileMenu.hasClass("transition")) {
                    self.$mobileMenu.removeClass("transition");
                }
                if (self.$mobileMenu.hasClass("visible")) {
                    self.$mobileMenu.removeClass("visible");
                }
            }, 330);

            return;

        } else {

            if (!this.$mobileMenu.hasClass("visible")) {
                this.$mobileMenu.addClass("visible");
            }

            setTimeout(function () {
                if (!self.$mobileMenu.hasClass("transition")) {
                    self.$mobileMenu.addClass("transition");
                }

                setTimeout(function () {
                    return $("body").addClass("menu-open");
                }, 20);

            }, 10);

            return;
        }
    };


    $scope.onSearchOpen = function () {
        this.$el = $("#navigation");
        this.$el.find(".search-item").addClass("active");
        this.$el.find(".search-item").find(".icon").removeClass("search");
        this.$el.find(".search-item").find(".icon").addClass("search-white");
        this.isSearchActive = true;
        if (!$("body").hasClass("search-open") && this.isHomePage !== true) {
            $("body").addClass("search-open");
            return true;
        }
        return true;
    };

    $scope.onSearchClose = function () {
        this.$el.find(".search-item").removeClass("active");
        this.$el.find(".search-item").find(".icon").removeClass("search-white");
        this.$el.find(".search-item").find(".icon").addClass("search");
        this.isSearchActive = false;
        $("body").removeClass("search-open");
        return;
    };

    $scope.onSearchClick = function (e) {
        if ($(window).scrollTop() < 1 && this.isHomePage === true) {
            return;
        }
        if ($("body").hasClass("menu-open")) {
            $scope.onMenuClick();
        }
        if ($("body").hasClass("search-open")) {
            return $scope.onSearchClose();
        } else {
            return $scope.onSearchOpen();
        }
    };





















    $scope.init();
});
