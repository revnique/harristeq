harristeqApp.controller('calendarController', function ($scope, harristeqSvc, $timeout) {

    //$scope.$on('getGarminDataEvent', function(event, mass) {
    //    $scope.startDate = mass[0];
    //    $scope.endDate = mass[1];
    //    $scope.getGarminData();
    //});

    //$scope.$watch('showAjax', function (newValue, oldValue) {
    //    $scope.$emit('showAjaxEvent', newValue);
    //});
    
    
    var ColHeader = function(day, date, alert1, alert2, alert3) {
        var self = this;
        self.Day = day;
        self.Date = date;
        self.Alert1 = alert1;
        self.Alert2 = alert2;
        self.Alert3 = alert3;
        return self;
    };

    var daysOfTheWeek = ["M","Tu","W","Th","F","Sa","Su"];

    $scope.colHeaders = [];

    var fillColHeaders = function (firstDay) {
        var j = 0;

        switch (firstDay) {
            case "M":
                j = 0;
                break;
            case "Tu":
                j = 1;
                break;
            case "W":
                j = 2;
                break;
            case "Th":
                j = 3;
                break;
            case "F":
                j = 4;
                break;
            case "Sa":
                j = 5;
                break;
            case "Su":
                j = 6;
                break;
            default:
                j = 0;
                break;
        }

        for (var i = 0; i < 31; i++) {
            var alert1, alert2, alert3, day;
            alert1 = i % 2 == 0 ? 0 : 1;
            alert2 = i % 3 == 1 ? 0 : 2;
            alert3 = i % 4 == 1 ? 3 : 0;
            day = daysOfTheWeek[j];
            $scope.colHeaders[i] = new ColHeader(day, i + 1, alert1, alert2, alert3);
            j++;
            if (j == 7) {
                j = 0;
            }
        }
    };

    $scope.init = function () {
        fillColHeaders("F");
        console.log("$scope.colHeaders[i]", $scope.colHeaders);
    };

    $scope.init();
});
