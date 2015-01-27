
var model = {
    rootNode: {}
};

var Attribute = function (name, value) {
    var self = this;
    self.Name = ko.observable(name);
    self.Value = ko.observable(value);
};

var Element = function(name, value, elements, attributes) {
    var self = this;
    self.Elements = ko.observableArray(elements);
    self.Attributes = ko.observableArray(attributes);
    self.Value = ko.observable(value);
    self.Name = ko.observable(name);
    return self;
};


var knockoutJsDemoViewModel = function() {
    //model.rootNode = new Element();
};

var reallyTypeOf = function(obj) {
    var t = typeof obj;
    var rtn;

    if (t == "object") {
        if (obj instanceof Array) {
            rtn = "array";
        } else if (obj instanceof Date) {
            rtn = "date";
        } else {
            rtn = t;
        }
    } else {
        rtn = t;
    }
    return rtn;
};

var createOrUpdateProperty = function (prop, val, obj) {
    if (prop in obj) {
        console.log("reallyTypeOf(val)", reallyTypeOf(val));
        eval("obj['" + prop + "'] = " + val);
    } else {
        //kind of a hack to create a dictionary
        Object.defineProperty(obj, prop, {
            enumerable: false,
            configurable: false,
            writable: true,
            value: val
        });
    }
    var dprop = eval("obj['" + prop + "']");
    console.log("obj.prop", dprop);
    return obj;
};

var createNodes = function (data, obj) {
    var length = Object.keys(data).length;
    var attributes = [];
    var elements = [];
    var propName, prop, propType, shortPropName;
    for (var i = 0; i < length; i++) {
        propName = Object.keys(data)[i];
        prop = eval("data['" + propName + "']");
        propType = reallyTypeOf(prop);

        console.log("typeof prop", typeof prop);
        console.log("reallyTypeOf prop", reallyTypeOf(prop));

        if (propName.indexOf("@") > -1) {
            console.log("attribute", propName);
            console.log("attribute v", prop);
            //shortPropName = propName.substring(1, propName.length);
            //console.log("shortPropName ", shortPropName);

            //attributes[i] = new Attribute(propName, prop);
            attributes[i] = propName;
            obj = createOrUpdateProperty("attributes", attributes, obj);
        } else {
            console.log("element", propName);
            console.log("element v", prop);
        }

        if (propType == "object") {
            if (Object.keys(prop).length > 0) {
                createNodes(prop, obj);
            }
        }
    }

    //var node = {
    //    Name: "TrainingCenterDatabase",
    //    Attributes: [],
    //    Value: "",
    //    Nodes: []
    //};
};



var cloneObservable = function (observableObject) {
    return ko.mapping.fromJS(ko.toJS(observableObject));
};


$(function () {
    getMetadata();
});

function getMetadata() {
    model.elements = $.parseJSON(rawData);
    console.log("model.elements", model.elements);


    console.log("Object.keys(model.elements.TrainingCenterDatabase.Activities.Activity)", Object.keys(model.elements.TrainingCenterDatabase.Activities.Activity));

    createNodes(model.elements, model.rootNode);
    console.log(model);
}































var d = ko.observable("yellow");
var r = ko.observable(rawData);

ko.applyBindings();
