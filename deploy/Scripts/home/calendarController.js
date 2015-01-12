﻿harristeqApp.controller('calendarController', function ($scope, harristeqSvc, $timeout) {

    //$scope.$on('getGarminDataEvent', function(event, mass) {
    //    $scope.startDate = mass[0];
    //    $scope.endDate = mass[1];
    //    $scope.getGarminData();
    //});

    //$scope.$watch('showAjax', function (newValue, oldValue) {
    //    $scope.$emit('showAjaxEvent', newValue);
    //});
    
    
    var ColHeader = function (day, date, alert1, alert2, alert3, selected) {
        var self = this;
        self.Day = day;
        self.Date = date;
        self.Alert1 = alert1;
        self.Alert2 = alert2;
        self.Alert3 = alert3;
        self.Selected = selected != null ? selected : false;
        return self;
    };

    var Task = function(name, startDate, endDate, selected) {
        var self = this;
        self.Name = name;
        self.StartDate = startDate;
        self.EndDate = endDate;
        self.Selected = selected != null ? selected : false;
    };

    var daysOfTheWeek = ["M","Tu","W","Th","F","Sa","Su"];

    $scope.colHeaders = [];
    $scope.tasks = [
        new Task("Task asdf", 7, 11),
        new Task("Task 2", 1, 3),
        new Task("Task 3", 17, 31),
        new Task("Task 4", 5, 25, true),
        new Task("Task rrr", 1, 21),
        new Task("Task ccc", 5, 6),
        new Task("Task aaa", 9, 22),
        new Task("Task bbb", 27, 31),
        new Task("Task ddd", 17, 19)
    ];

    $scope.numberOfDaysInMonth = 31;

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

            var isSelected = false;
            if (i == 17) {
                isSelected = true;
            }
            
            $scope.colHeaders[i] = new ColHeader(day, i + 1, alert1, alert2, alert3, isSelected);

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
