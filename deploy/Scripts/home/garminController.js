harristeqApp.controller('garminController', function ($scope, harristeqSvc, $timeout) {

    $scope.$on('getGarminDataEvent', function(event, mass) {
        $scope.startDate = mass[0];
        $scope.endDate = mass[1];
        $scope.getGarminData();
    });

    $scope.$watch('showAjax', function (newValue, oldValue) {
        $scope.$emit('showAjaxEvent', newValue);
    });
    
    var Lap = function (lapData) {
        var lapSelf = this;
        lapSelf.startTime = lapData['@StartTime'];
        lapSelf.totalTimeSeconds = lapData.TotalTimeSeconds;
        lapSelf.distanceMeters = lapData.DistanceMeters;
        lapSelf.maximumSpeed = lapData.MaximumSpeed;
        lapSelf.calories = lapData.Calories;
        lapSelf.averageHeartRateBpm = lapData.AverageHeartRateBpm.Value;
        lapSelf.maximumHeartRateBpm = lapData.MaximumHeartRateBpm.Value;
        lapSelf.cadence = lapData.Cadence;
        lapSelf.trackpointCount = lapData.Track.Trackpoint.length;
    };

    $scope.init = function () {
        $scope.getGarminData();
    };

    $scope.getGarminData = function () {
        var dateObj = {
            startDate: $scope.startDate,
            endDate: $scope.endDate
        };
        $scope.showAjax = true;
        harristeqSvc.getGarminData(dateObj).then(function (results) {
            $scope.showAjax = false;
            //alert(results);
            $scope.garminData = results;
        }, function() {
            $scope.showAjax = false;
        }).then(function () {
            var gData = $scope.garminData;
            if (gData.length > 0) {
                $timeout(function () {
                    $scope.gridOptions.selectRow(0, true);
                });
                //console.log("gData", gData);
                //$scope.getGarminDetail(gData[0].trainingCenterFileId);
            }
        });
    };

    $scope.garminData = [];
    $scope.gridOptions = {
        data: 'garminData',
        multiSelect: false,
        columnDefs: [
            { field: 'trainingCenterFileId', displayName: 'Id', width: '50px' },
            { field: 'date', displayName: 'Date', cellFilter: 'date:"MM/dd/yyyy hh:mm:ss a"' },
            { field: 'fileName', displayName: 'Name' },
            { field: 'activity', displayName: 'Activity' },
            { field: 'size', displayName: 'Size' }
        ],
        afterSelectionChange: function (row, evt) {
            if (row.selected) {
                $scope.selectedSetting = row.entity;
                $scope.settingClone = angular.copy(row.entity);
                $scope.getGarminDetail(row.entity.trainingCenterFileId);
            }
        }
    };

    $scope.getGarminDetail = function (trainingCenterFileId) {
        $scope.showAjax = true;
        harristeqSvc.getGarminDetail(trainingCenterFileId).then(function (results) {
            $scope.showAjax = false;
            //alert(results);
            $scope.garminDetailData = results;
            $scope.fillGarminDetail($.parseJSON(results));
            $scope.displayChart($scope.garminDetail.laps);
        }, function () {
            $scope.showAjax = false;
        });
    };

    $scope.fillGarminDetail = function(data) {
        var self = this;
        self.lapCount = data.TrainingCenterDatabase.Activities.Activity.Lap.length;
        self.laps = [];
        for (var i = 0; i < self.lapCount; i++) {
            self.laps[i] = new Lap(data.TrainingCenterDatabase.Activities.Activity.Lap[i]);
        }

        $scope.garminDetail = self;
        return self;
    };

    $scope.displayChart = function (data) {
        console.log("displayChart ", data);
        var max = 1;
        var series = [];
        for (var i = 0; i < data.length; i++) {
            series[i] = {
                name: "Lap " + (i + 1) ,
                data: [
                    data[i].totalTimeSeconds / 60,
                    data[i].averageHeartRateBpm,
                    data[i].calories,
                    (data[i].distanceMeters / data[i].totalTimeSeconds) * 2.23694
                ]
            };
            if (max < data[i].calories) {
                max = data[i].calories;
            }
        }
        max = (max * 1) + 50;

        //lapSelf.startTime = lapData['@StartTime'];
        //lapSelf.totalTimeSeconds = lapData.TotalTimeSeconds;
        //lapSelf.distanceMeters = lapData.DistanceMeters;
        //lapSelf.maximumSpeed = lapData.MaximumSpeed;
        //lapSelf.calories = lapData.Calories;
        //lapSelf.averageHeartRateBpm = lapData.AverageHeartRateBpm.Value;
        //lapSelf.maximumHeartRateBpm = lapData.MaximumHeartRateBpm.Value;
        //lapSelf.cadence = lapData.Cadence;
        //lapSelf.trackpointCount = lapData.Track.Trackpoint.length;


        $("#lapChart").kendoChart({
            legend: {
                visible: true
            },
            seriesDefaults: {
                type: "column"
            },
            seriesColors: [	"#3D5266","#4C6680","#5C7A99","#6B8FB2","#7AA3CC","#8AB8E6","#99CCFF","#A3D1FF","#ADD6FF","#B8DBFF","#C2E0FF","#CCE6FF","#D6EBFF","#E0F0FF"],
            series: series,
            valueAxis: {
                max: max
            },
            categoryAxis: [
                {
                categories: ["Time (m)", "AvgHR", "Cals", "AvgMPH"]
                }
            ],
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            }
        });
    };

    $scope.init();
});
