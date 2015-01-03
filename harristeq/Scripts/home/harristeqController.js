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

    $scope.init();
});
