window.userId = 1;

harristeqApp.factory('harristeqSvc', ['$http', '$window', '$q', '$timeout',
    function ($http, $window, $q, $timeout) {
        var svc = {};

        var userId = $window.userId;

        if (!userId)
            throw 'Failed to retrieve userId from window.';

        svc.userId = userId;

        var rootUrl = function () {
            var isProd = location.href.toLowerCase().indexOf("localhost") > -1 ? false : true;
            return isProd ? "" : "/harristeq";
        };

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
                    svc.showMessage(msg, "error");
                    deferred.reject(msg);
                });

            return deferred.promise;
        };

        svc.getGarminData = function (dateObj) {
            var deferred = $q.defer();
            $http.post(rootUrl() + "/home/getGarminData", dateObj)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    var msg = 'Error fetching tasks.';
                    svc.showMessage(msg, "error");
                    deferred.reject(msg);
                });

            return deferred.promise;
        };

        svc.getGarminDetail = function (trainingCenterFileId) {
            var deferred = $q.defer();
            $http.get(rootUrl() + "/home/getGarminDetail/?trainingCenterFileId=" + trainingCenterFileId)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    var msg = 'Error fetching tasks.';
                    svc.showMessage(msg, "error");
                    deferred.reject(msg);
                });

            return deferred.promise;
        };

        svc.showMessage = function (msg, type) {
            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
                theme: 'flat'
            }

            switch (type) {
                case "info":
                    Messenger().post(msg);
                    break;
                case "error":
                    Messenger().post({
                        message: msg,
                        type: 'error',
                        showCloseButton: true
                    });
                    break;
                case "button":
                    var msgr;
                    msgr = Messenger().post({
                        message: 'Uploading new files...',
                        type: 'info',
                        actions: {
                            cancel: {
                                label: 'cancel upload',
                                action: function () {
                                    return msgr.update({
                                        message: msg,
                                        type: 'success',
                                        actions: false
                                    });
                                }
                            }
                        }
                    });
                    break;
                case "run":

                    var i = 0;
                    Messenger().run({
                        errorMessage: msg,
                        successMessage: 'Message sent!',
                        action: function (opts) {
                            if (++i < 2) {
                                return opts.error({
                                    status: 500,
                                    readyState: 0,
                                    responseText: 0
                                });
                            } else {
                                return opts.success();
                            }
                        }
                    });
                    break;
                default:
                    Messenger().post(msg);
            }
        };

        $http.defaults.useXDomain = true;

        svc.getTrailInfo = function () {
            var deferred = $q.defer();

            $http.get("http://bikegrapevine.org/code/index.php")
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                    //alert(data);
                    svc.showLoading = false;
                }).error(function (data, status, headers, config) {
                    var msg = 'Error fetching trail info.';
                    svc.showMessage(msg, "error");
                    deferred.reject(msg);
                });

            return deferred.promise;
        };

        svc.getTrailInfoNew = function () {
            var deferred = $q.defer();

            //$http.get("http://dorba.org/services/trails.php")
            $http.get("../home/dorbadata")
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                    //alert(data);
                    svc.showLoading = false;
                }).error(function (data, status, headers, config) {
                    var msg = 'Error fetching trail info.';
                    svc.showMessage(msg, "error");
                    deferred.reject(msg);
                });

            return deferred.promise;
        };

        svc.getLocationData = function (geoLat, geoLong) {
            var deferred = $q.defer();

            //$http.get("http://dorba.org/services/trails.php")
            $http.get("http://ws.geonames.org/findNearbyPostalCodesJSON?formatted=true&lat=" + geoLat + "&lng=" + geoLong + "&username=harristeq.com")
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                    //alert(data);
                    svc.showLoading = false;
                }).error(function (data, status, headers, config) {
                    var msg = 'Error fetching trail info.';
                    svc.showMessage(msg, "error");
                    deferred.reject(msg);
                });

            return deferred.promise;
        };


        return svc;
    }
]);
