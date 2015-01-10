harristeqApp.controller('calendarController', function ($scope, harristeqSvc, $timeout) {

    //$scope.$on('getGarminDataEvent', function(event, mass) {
    //    $scope.startDate = mass[0];
    //    $scope.endDate = mass[1];
    //    $scope.getGarminData();
    //});

    //$scope.$watch('showAjax', function (newValue, oldValue) {
    //    $scope.$emit('showAjaxEvent', newValue);
    //});
    
    
    var colHeader = function(day, date, alert1, alert2, alert3) {
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

    var fillColHeaders = function(firstDay) {
        for (var i = 0; i < 32; i++) {
            
        }
    };

    $scope.init = function () {

    };

    $scope.init();
});
