harristeqApp.controller('harristeqController', function ($scope, harristeqSvc) {
    //receive broadcast from children controllers
    $scope.$on('showAjaxEvent', function (event, data) {
        $scope.showAjax = data;
    });

    $scope.init = function () {
        // Range Datepicker
        $('.input-daterange').datepicker({
            autoclose: true,
            orientation: 'right top',
            endDate: new Date()
        });

        $scope.showDates = false;
        $scope.garminDemoActive = false;
        if (location.href.toLowerCase().indexOf("garmindemo") > -1) {
            $scope.showDates = true;
            $scope.garminDemoActive = true;
        }
        if (location.href.toLowerCase().indexOf("onemonthspanish") > -1) {
            $scope.spanishActive = true;
        }

        //$scope.startDate = "06/27/2014";
        //$scope.endDate = "07/27/2014";
        $scope.startDate = "07/07/2014";
        $scope.endDate = "07/11/2014";
    };

    $scope.getGarminData = function () {
        $scope.showAjax = true;
        //broadcast to children controllers
        $scope.$broadcast('getGarminDataEvent', [$scope.startDate, $scope.endDate]);
    };

    var getIsActive = function (url) {
        if (window.location.href.indexOf(url) > -1)
            return true;
        else
            return false;
    };

    var rootUrl = function () {
        var isProd = location.href.toLowerCase().indexOf("localhost") > -1 ? false : true;
        return isProd ? "" : "/harristeq";
    };

    $scope.navItems = [
        {
            name: "Garmin Demo",
            url: rootUrl() + "/home/garmindemo",
            isActive: getIsActive("/home/garmindemo"),
            iconClass: "ion-cloud"
        },
        {
            name: "Task Demo",
            url: rootUrl() + "/home/taskdemo",
            isActive: getIsActive("/home/taskdemo"),
            iconClass: "ion-checkmark"
        },
        {
            name: "Spanish Sync Demo",
            url: rootUrl() + "/home/onemonthspanish",
            isActive: getIsActive("/home/onemonthspanish"),
            iconClass: "ion-person-stalker"
        },
        {
            name: "Dorba Demo",
            url: rootUrl() + "/home/dorbademo",
            isActive: getIsActive("/home/dorbademo"),
            iconClass: "ion-ios7-gear-outline"
        },
        {
            name: "Triforce Demo",
            url: rootUrl() + "/home/triforcedemo",
            isActive: getIsActive("/home/triforcedemo"),
            iconClass: "ion-ios7-bolt"
        },
        {
            name: "Calendar Demo",
            url: rootUrl() + "/home/calendardemo",
            isActive: getIsActive("/home/calendardemo"),
            iconClass: "ion-ios7-calendar-outline"
        },
        {
            name: "DT Assignment",
            url: rootUrl() + "/home/dtassignment",
            isActive: getIsActive("/home/dtassignment"),
            iconClass: "ion-ios7-keypad-outline"
        },
        {
            name: "KnockoutJs Demo",
            url: rootUrl() + "/home/knockoutjsdemo",
            isActive: getIsActive("/home/knockoutjsdemo"),
            iconClass: "ion-android-hand"
        },
        {
            name: "Papaya Garden",
            url: rootUrl() + "/home/knockoutjsdemo",
            isActive: getIsActive("/home/knockoutjsdemo"),
            iconClass: "ion-android-developer"
        }
    ];
    
    $scope.init();
});
