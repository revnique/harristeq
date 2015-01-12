harristeqApp.controller('calendarController', function ($scope, harristeqSvc, $timeout) {

    //$scope.$on('getGarminDataEvent', function(event, mass) {
    //    $scope.startDate = mass[0];
    //    $scope.endDate = mass[1];
    //    $scope.getGarminData();
    //});

    //$scope.$watch('showAjax', function (newValue, oldValue) {
    //    $scope.$emit('showAjaxEvent', newValue);
    //});

    var daysInMonth = function(month, year) {
        return new Date(year, month, 0).getDate();
    };

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    
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

    var daysOfTheWeek = ["Su","M","Tu","W","Th","F","Sa"];

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

    $scope.fillColHeaders = function (firstDay, currentDay) {
        var j = 0;

        switch (firstDay) {
            case "Su":
                j = 0;
                break;
            case "M":
                j = 1;
                break;
            case "Tu":
                j = 2;
                break;
            case "W":
                j = 3;
                break;
            case "Th":
                j = 4;
                break;
            case "F":
                j = 5;
                break;
            case "Sa":
                j = 6;
                break;
            default:
                j = 0;
                break;
        }

        for (var i = 0; i < $scope.numberOfDaysInMonth; i++) {
            var alert1, alert2, alert3, day;
            alert1 = i % 2 == 0 ? 0 : 1;
            alert2 = i % 3 == 1 ? 0 : 2;
            alert3 = i % 4 == 1 ? 3 : 0;
            day = daysOfTheWeek[j];

            var isSelected = false;
            if (i == currentDay - 1) {
                isSelected = true;
            }
            
            $scope.colHeaders[i] = new ColHeader(day, i + 1, alert1, alert2, alert3, isSelected);

            j++;
            if (j == 7) {
                j = 0;
            }
        }
    };

    var getFirstDayOfMonth = function(date) {
        var newDate = new Date(month[date.getMonth()] + " 01, " + date.getFullYear());
        console.log("newDate.getDay()", newDate.getDay());
        return newDate.getDay();
    };

    $scope.init = function () {
        var m, year, date, currentDay;
        //date = new Date("June 3, 2014");
        date = new Date();




        m = date.getMonth();
        year = date.getFullYear();
        currentDay = date.getDate();

        getFirstDayOfMonth(date);

        $scope.monthName = month[m];
        $scope.year = year;
        $scope.numberOfDaysInMonth = daysInMonth(m + 1, year);
        $scope.firstDayOfMonth = daysOfTheWeek[getFirstDayOfMonth(date)];
        $scope.fillColHeaders($scope.firstDayOfMonth, currentDay);
        console.log("$scope.colHeaders[i]", $scope.colHeaders);
    };

    $scope.init();
});
