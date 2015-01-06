harristeqApp.controller('dorbaController', function($scope, harristeqSvc) {


    $scope.init = function() {
        var d = $scope.getJsBin;
    };

    $scope.getJsBin = harristeqSvc.getTrailInfo().then(function (results) {
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

    $scope.init();
});
