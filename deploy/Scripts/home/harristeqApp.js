var harristeqApp = angular.module('harristeqApp', ['ngRoute', 'ngGrid']);

harristeqApp.config(function ($httpProvider, $sceProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $sceProvider.enabled(false);
});

//prodSupportModule.controller('appInfoController', function ($scope, prodDataService) {

//    $scope.appInfoData = [];
//    $scope.selectedXml = "";

//    var cellTemplate = '<div style="word-wrap: none" class="ngCellText" ng-class="col.colIndex()" title="{{row.getProperty(col.field)}}">' +
//        '<span class="ng-binding">{{row.getProperty(col.field)}}</span></div>';

//    $scope.gridOptions = {
//        data: 'appInfoData',
//        multiSelect: false,
//        sortInfo: { fields: ['CreateDate'], directions: ['asc'] },
//        columnDefs: [{ field: 'CreateDate', displayName: 'Date', cellFilter: 'date:"MM/dd/yyyy hh:mm:ss a"', width: "15%" },
//            { field: 'DealDetailId', displayName: 'Deal Detail Id', width: "10%" },
//            { field: 'Name', displayName: 'Name', width: "20%" },
//            { field: 'Value', displayName: 'Value', cellTemplate: cellTemplate },
//            {
//                field: 'XmlValue', displayName: 'Xml',
//                cellTemplate: '<div class="ngCellText xmlViewLink" ng-click="showXml(row.entity)">' +
//                    '{{ row.entity.XmlValue != "(null)" && row.entity.XmlValue != "" && row.entity.XmlValue != null ? "View" : ""}}</div>',
//                width: "15%"
//            }
//        ]
//    };

//    $scope.showXml = function (entity) {
//        if (entity.XmlValue == "(null)") return;
//        $scope.selectedXml = entity.XmlValue;
//        $('#appInfoXmlModal').modal('show');
//    };

//    $scope.$on('searchAppContent', function (event, data) {
//        var promise = prodDataService.getAppInfo(data.clientId, data.applicationNumber, data.dealDetailId, data.sourceSystemId);
//        promise.then(function (response) {
//            $scope.appInfoData = response;
//        });
//    });
//});

