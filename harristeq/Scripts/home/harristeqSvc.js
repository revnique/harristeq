window.userId = 1;

harristeqApp.factory('harristeqSvc', ['$http', '$window', '$q', '$timeout',
    function ($http, $window, $q, $timeout) {
        var svc = {};

        var userId = $window.userId;

        if (!userId)
            throw 'Failed to retrieve userId from window.';

        svc.userId = userId;

        svc.getBlinkGreen = function () {
            var rtn;
            if ($window.stopBlinkAll || $window.stopBlinkGreen) {
                rtn = false;
            } else {
                rtn = true;
            }
            return rtn;
        };

        svc.getBlinkYellow = function () {
            var rtn;
            if ($window.stopBlinkAll || $window.stopBlinkYellow) {
                rtn = false;
            } else {
                rtn = true;
            }
            return rtn;
        };

        svc.getBlinkRed = function () {
            var rtn;
            if ($window.stopBlinkAll || $window.stopBlinkRed) {
                rtn = false;
            } else {
                rtn = true;
            }
            return rtn;
        };

        var cleanJsBinData = function (jsBinString) {
            var rtn = "";
            rtn = jsBinString.substring(0, jsBinString.indexOf("<endData/>"));
            return rtn;
        };

        svc.getFromJsBin = function () {
            var deferred = $q.defer();
            //http://rabidgadfly.com/2013/02/angular-and-xml-no-problem/
            $http.get("http://jsbin.com/hinecolu/3")
                .success(function (data, status, headers, config) {
                    data = cleanJsBinData(data);
                    deferred.resolve(data);
                    //alert(data);
                }).error(function (data, status, headers, config) {
                    var msg = 'Error fetching tasks.';
                    alert(msg);
                    deferred.reject(msg);
                });

            return deferred.promise;
        };

        svc.getGarminData = function (dateObj) {
            var startDate = dateObj.startDate;
            var endDate = dateObj.endDate;

            var deferred = $q.defer();
            $http.post("/harristeq/home/getGarminData", dateObj)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                    //alert(data);
                }).error(function (data, status, headers, config) {
                    var msg = 'Error fetching tasks.';
                    alert(msg);
                    deferred.reject(msg);
                });

            return deferred.promise;
        };

        return svc;
    }
]);
