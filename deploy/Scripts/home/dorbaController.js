harristeqApp.controller('dorbaController', function($scope, harristeqSvc) {

    var Trail = function(id, name, address, mapLink, currentStatus) {
        var self = this;
        self.Name = name;
        self.ID = id;
        self.Address = address;
        self.MapLink = mapLink;
        self.CurrentStatus = currentStatus;
        return self;
    };

    $scope.trails = [];

    $scope.getTrailMetadata = function (data) {
        var trail;
        trail = new Trail("1", "Arbor Hills", "6701 W Parker Rd Plano, TX 75093", "http://maps.google.com/?q=33.05031+-96.850428", 0);
        $scope.trails.push(trail);
        trail = new Trail("2", "Big Cedar", "7532 Saddleridge Dr Dallas, TX 75249", "http://maps.google.com/?q=32.649084+-96.960654", 0);
        $scope.trails.push(trail);
        trail = new Trail("3", "Bonham State Park", "1363 State Park 24, Bonham, TX 75418", "https://www.google.com/maps?q=33.547583+-96.144257", 0);
        $scope.trails.push(trail);
        trail = new Trail("4", "Boulder Park", "6600 Pastor Bailey Dr. Dallas, TX 75237", "http://maps.google.com/?q=32.668934+-96.874233", 0);
        $scope.trails.push(trail);
        trail = new Trail("5", "Cedar Hill State Park", "1570 Farm to Market Road 1382, Cedar Hill, TX 75104", "http://maps.google.com/?q=32.609974+-96.997445", 0);
        $scope.trails.push(trail);
        trail = new Trail("6", "Cleburne State Park", "5800 Park Road 21, Cleburne, TX 76033", "https://www.google.com/maps?q=32.255400+-97.552543", 0);
        $scope.trails.push(trail);
        trail = new Trail("7", "Cross Timbers", "513 Cedar Bayou Boulevard, Gordonville, TX 76245", "http://maps.google.com/?q=33.839267+-96.848989", 0);
        $scope.trails.push(trail);
        trail = new Trail("8", "Dinosaur Valley State Park", "1629 Park Road 59, Glen Rose, TX 76043", "http://maps.google.com/?q=32.249684+-97.813854", 0);
        $scope.trails.push(trail);
        trail = new Trail("9", "Eisenhower State Park", "50 Park Road 20 Denison, TX 75020", "http://maps.google.com/?q=33.818539+-96.609336", 0);
        $scope.trails.push(trail);
        trail = new Trail("10", "Erwin Park", "4300 County Road 1006 McKinney, TX 75069", "http://maps.google.com/?q=33.254825+-96.655964", 0);
        $scope.trails.push(trail);
        trail = new Trail("11", "Greenbelt Corridor Park", "5120 E University Dr, Denton, TX 76208", "http://maps.google.com/?q=33.240469+-97.041700", 0);
        $scope.trails.push(trail);
        trail = new Trail("12", "Harry Moss Park", "7601 Greenville Ave Dallas, TX 75231", "http://maps.google.com/?q=32.887029+-96.756334", 0);
        $scope.trails.push(trail);
        trail = new Trail("13", "Horseshoe", "Catfish Ln Grapevine, TX 76051", "http://maps.google.com/?q=32.963559+-97.094271", 0);
        $scope.trails.push(trail);
        trail = new Trail("14", "Isle du Bois", "Isle du Bois Unit 100 PW 4137, Pilot Point, TX 76258-8944", "http://maps.google.com/?q=33.380279+-97.030021", 0);
        $scope.trails.push(trail);
        trail = new Trail("15", "Johnson Branch", "Johnson Branch Unit 100 PW 4153, Valley View, TX 76272-7411", "http://maps.google.com/?q=33.422808+-97.054743", 0);
        $scope.trails.push(trail);
        trail = new Trail("16", "Knob Hills", "U.S. 377 Roanoke, TX 76262, 33.044995, -97.207173", "http://maps.google.com/?q=33.044995+-97.207173", 0);
        $scope.trails.push(trail);
        trail = new Trail("17", "L.B. Houston Nature Trails", "1368 California Crossing Rd Dallas, Texas", "http://maps.google.com/?q=32.860961+-96.907526", 0);
        $scope.trails.push(trail);
        trail = new Trail("19", "Northshore Trail", "Mountain Bike Trail Grapevine, TX 76051", "http://maps.google.com/?q=32.982739+-97.067900", 0);
        $scope.trails.push(trail); 
        trail = new Trail("20", "Oak Cliff Nature Preserve", "2875 Pierce St Dallas, TX 75233", "http://maps.google.com/?q=32.714330+-96.865795", 0);
        $scope.trails.push(trail);
        trail = new Trail("21", "River Legacy", "Mountain Bike Trail Arlington, TX 76006", "http://maps.google.com/?q=32.793227+-97.116416", 0);
        $scope.trails.push(trail);
        trail = new Trail("22", "Rowlett Creek Preserve", "2525 Castle Rd Garland, TX 75040", "http://maps.google.com/?q=32.920088+-96.595573", 0);
        $scope.trails.push(trail);
        trail = new Trail("23", "Sansom Park", "2470 Roberts Cut Off Rd, Fort Worth, TX 76114", "http://maps.google.com/?q=32.798007+-97.412063", 0);
        $scope.trails.push(trail);
        trail = new Trail("24", "Sid Richardson Ranch", "Wood Badge, Bridgeport, TX 76426", "http://maps.google.com/?q=33.238204+-97.862443", 0);
        $scope.trails.push(trail);
        trail = new Trail("25", "Sister Grove Park", "11193-11417 Co Road 562, Princeton, TX 75407", "http://maps.google.com/?q=33.183501+-96.444983", 0);
        $scope.trails.push(trail);
        trail = new Trail("26", "Solavaca Ranch", "7582 Farm to Market 205, Glen Rose, TX 76043", "http://maps.google.com/?q=32.245474+-97.878571", 0);
        $scope.trails.push(trail);
        trail = new Trail("27", "Squabble Creek", "Dickson Ln Rockwall, TX 75087", "http://maps.google.com/?q=32.949011+-96.467005", 0);
        $scope.trails.push(trail);
        trail = new Trail("28", "Trinity River Connector", "3700 Sylvan Avenue, Dallas, TX 75207", "http://maps.google.com/?q=32.790056+-96.834899", 0);
        $scope.trails.push(trail);
        trail = new Trail("29", "Tyler State Park", "789 Park Road 16 Tyler, TX 75706", "http://maps.google.com/?q=32.472478+-95.299187", 0);
        $scope.trails.push(trail);
        trail = new Trail("30", "Windmill Hill Preserve", "1529 W Wintergreen Rd, DeSoto, TX 75115", "http://maps.google.com/?q=33.183501+-96.444983", 0);
        $scope.trails.push(trail);
        trail = new Trail("32", "Frisco NW Community Park Trail", "1506 Gloryview Road, Frisco, TX 75034", "http://maps.google.com/?q=33.198782+-96.864524", 0);
        $scope.trails.push(trail);
        trail = new Trail("33", "Katie Jackson", "5032 Haverwood Ln Dallas, TX 75287", "http://maps.google.com/?q=33.00674770+-96.8222160", 0);
        $scope.trails.push(trail);
        trail = new Trail("41", "Goat Island Preserve", "2800 Post Oak Rd. Hutchins, TX 75141", "http://maps.google.com/?q=32.635504+-96.646503", 0);
        $scope.trails.push(trail);
        trail = new Trail("49", "Binkley Park", "120 Binkley Park Dr, Sherman, TX 75092", "http://maps.google.com/?q=33.627921+-96.631310", 0);
        $scope.trails.push(trail);
        trail = new Trail("50", "Gateway Park", "5391 E 1st St, Fort Worth, TX 76103", "http://maps.google.com/?q=32.761195+-97.278058", 0);
        $scope.trails.push(trail);

        console.log("$scope.trails", $scope.trails);
        console.log("data", data);
    };






    $scope.init = function() {
        var d = $scope.getJsBin;
        $scope.getTrailMetadata($scope.dorbaData);
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
