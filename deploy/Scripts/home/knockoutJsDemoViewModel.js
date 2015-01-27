
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




//function SourceModel(options) {
//    var self = this;
//    self.RootNode = ko.observable();
//    self.SelectedNode = ko.observable(new XmlElement());

//    self.entryTypes = ko.observableArray([
//        { id: 0, name: 'None', type: '' },
//        { id: 1, name: 'Data Entry', type: 'Data Entry' },
//        { id: 2, name: 'From DB', type: 'From DB' },
//        { id: 5, name: 'From Collection', type: 'From Collection' }
//    ]);

//    self.elementEntryTypes = ko.observableArray([
//        { id: 0, name: 'None', type: '' },
//        { id: 1, name: 'Data Entry', type: 'Data Entry' },
//        { id: 2, name: 'From DB', type: 'From DB' },
//        { id: 3, name: 'References', type: 'References' },
//        { id: 4, name: 'Adverse Actions', type: 'AdverseActions' },
//        { id: 6, name: 'Reports', type: 'Reports' },
//        { id: 7, name: 'Addresses', type: 'Addresses' },
//        { id: 8, name: 'Employers', type: 'Employers' },
//        { id: 9, name: 'Incomes', type: 'Incomes' },
//        { id: 10, name: 'Expenses', type: 'Expenses' },
//        { id: 11, name: 'Retail Installment Contract', type: 'RetailInstallmentContract' },
//        { id: 12, name: 'Custom Fields', type: 'CustomFields' },
//        { id: 13, name: 'Decision History', type: 'DecisionHistory' },
//        { id: 14, name: 'Errors', type: 'Errors' },
//        { id: 15, name: 'Notifications', type: 'Notifications' },
//        { id: 16, name: 'Stipulations', type: 'Stipulations' },
//        { id: 17, name: 'Loan Applications', type: 'LoanApplications' },
//        { id: 18, name: 'Applicants', type: 'Applicants' },
//        { id: 19, name: 'Applicant Contacts', type: 'ApplicantContacts' },
//        { id: 20, name: 'Documents', type: 'Documents' },
//        { id: 21, name: 'Document Questions', type: 'DocumentQuestions' },
//        { id: 22, name: 'Custom Scores', type: 'Custom Scores' },
//        { id: 23, name: 'Custom Scorecard Points', type: 'CustomScorecardPoints' },
//        { id: 24, name: 'Vehicles', type: 'Vehicles' },
//        { id: 25, name: 'Vehicle Options', type: 'Vehicle Options' },
//        { id: 26, name: 'Notes', type: 'Notes' },
//        { id: 27, name: 'Assigned Users', type: 'AssignedUsers' },
//        { id: 28, name: 'Rules', type: 'Rules' },
//        { id: 29, name: 'Decision History Items', type: 'DecisionHistoryItems' },
//        { id: 30, name: 'Verification Questions', type: 'VerificationQuestions' },
//        { id: 31, name: 'Stipulation Answers', type: 'StipulationAnswer' },
//        { id: 32, name: 'Vehicle Evaluations', type: 'Vehicle Evaluations' },
//        { id: 32, name: 'Decision Group', type: 'Decision Group' },
//        { id: 43, name: 'Deal Structure', type: 'DealStructure' },
//        { id: 33, name: 'Dealer Notes', type: 'DealerNotes' },
//    ]);

//    self.getEntryTypes = function () {
//        return self.SelectedNode().isLeaf() ? self.entryTypes : self.elementEntryTypes;
//    };

//    self.filteredGroups = function () {
//        if (self.SelectedNode().EntryTypeId() == 2) return _.filter(model.groups, function (g) { return !g.IsCollection; });
//        if (self.SelectedNode().EntryTypeId() == 5) return _.filter(model.groups, function (g) { return g.IsCollection; });
//        return [];
//    };

//    self.setGroupName = function () {
//        var groupId = self.SelectedNode().DataElementGroupId();
//        var group = _.find(self.filteredGroups(), function (g) { return g.Id == groupId; });
//        if (group !== undefined && group !== null) self.SelectedNode().DataElementGroupName(group.GroupName);
//        else {
//            self.SelectedNode().DataElementGroupId(undefined);
//            self.SelectedNode().DataElementGroupName("");
//        }
//    };

//    self.setElementName = function () {
//        var elementId = self.SelectedNode().DataElementId();
//        var element = _.find(model.elements, function (g) { return g.Id == elementId; });
//        if (element !== undefined && element !== null) self.SelectedNode().DataElementName(element.Name);
//        else {
//            self.SelectedNode().DataElementId(undefined);
//            self.SelectedNode().DataElementName("");
//        }
//    };

//    self.elementsFor = ko.computed(function () {
//        var groupId = self.SelectedNode().DataElementGroupId();
//        var filtered = _.filter(model.elements, function (e) { return e.GroupId == groupId; });
//        var sorted = _.sortBy(filtered, function (e) { return e.Name.toLowerCase(); });
//        return sorted;
//    });

//    self.changeOfEntryType = function () {
//        var selectedEntryType = _.find(self.getEntryTypes()(), function (et) {
//            return et.id == self.SelectedNode().EntryTypeId();
//        });
//        if (selectedEntryType !== undefined && selectedEntryType !== null) self.SelectedNode().EntryType(selectedEntryType.type);
//        if (!self.SelectedNode().isLeaf()) return;
//        if ([2, 5].indexOf(self.SelectedNode().EntryTypeId()) >= 0) { // from DB, from Collection
//            self.SelectedNode().StaticValue("");
//        } else {
//            self.SelectedNode().DataElementGroupId(undefined);
//            self.SelectedNode().DataElementId(undefined);
//            self.SelectedNode().DataElementGroupName("");
//            self.SelectedNode().DataElementName("");
//        }
//    };
//}

//function XmlElement(options) {
//    console.log(options);
//    var self = this;
//    self.Attributes = ko.observableArray();
//    self.Elements = ko.observableArray();

//    var mapping = {
//        'Attributes': {
//            create: function (data) {
//                return new XmlElement(data.data);
//            }
//        },
//        'Elements': {
//            create: function (data) {
//                return new XmlElement(data.data);
//            }
//        }
//    };

//    ko.mapping.fromJS(options, mapping, this);

//    if (self.SourceItemId == undefined) self.SourceItemId = ko.observable(0);
//    if (self.Name == undefined) self.Name = ko.observable();
//    if (self.EntryType == undefined) self.EntryType = ko.observable();
//    if (self.EntryTypeId == undefined) self.EntryTypeId = ko.observable();
//    if (self.StaticValue == undefined) self.StaticValue = ko.observable();
//    if (self.DataElementGroupId == undefined) self.DataElementGroupId = ko.observable();
//    if (self.DataElementGroupName == undefined) self.DataElementGroupName = ko.observable();
//    if (self.DataElementId == undefined) self.DataElementId = ko.observable();
//    if (self.DataElementName == undefined) self.DataElementName = ko.observable();
//    if (self.Visible == undefined) self.Visible = ko.observable(false);
//    if (self.Expanded == undefined) self.Expanded = ko.observable(false);
//    if (self.SpaceCount == undefined) self.SpaceCount = ko.observable();
//    if (self.Selected == undefined) self.Selected = ko.observable();
//    if (self.Hovered == undefined) self.Hovered = ko.observable(false);
//    if (self.CollectionTypeId == undefined) self.CollectionTypeId = ko.observable();

//    this.isLeaf = ko.computed(function () {
//        return self.Attributes().length == 0 && self.Elements().length == 0;
//    });

//    self.Expanded.subscribe(function (value) {
//        _.each(self.Attributes(), function (item) { item.Visible(value); });
//        _.each(self.Elements(), function (item) { item.Visible(value); });
//    });

//    this.toggleHover = function () {
//        self.Hovered(!self.Hovered());
//    };

//    this.setAsSelected = function () {
//        //global context usage
//        if (model.sourceModel.SelectedNode() !== undefined) model.sourceModel.SelectedNode().Selected(false);
//        model.sourceModel.SelectedNode(self);
//        self.Selected(true);

//    };



//    this.xPathString = ko.observable();
//    this.xmlField = ko.observable();
//    this.xmlFieldType = ko.observable("Element");

//    self.Visible.subscribe(function (value) {
//        if (!value) {
//            _.each(self.Attributes(), function (item) { item.Visible(false); });
//            _.each(self.Elements(), function (item) { item.Expanded(false); item.Visible(false); });
//        } else {
//            if (self.Expanded()) {
//                _.each(self.Attributes(), function (item) { item.Visible(true); });
//                _.each(self.Elements(), function (item) { item.Visible(true); });
//            }
//        }
//    });

//    this.toggle = function () {
//        if (!self.isLeaf()) self.Expanded(!self.Expanded());
//    };

//    self.toggleAll = function (expand) {
//        expand = expand !== false;
//        if (!self.isLeaf()) {
//            _.each(self.Attributes(), function (item) { item.Expanded(expand); });
//            _.each(self.Elements(), function (item) { item.Expanded(expand); });
//        }
//        _.each(self.Attributes(), function (item) { item.toggleAll(expand); });
//        _.each(self.Elements(), function (item) { item.toggleAll(expand); });
//    };
//};






























var d = ko.observable("yellow");
var r = ko.observable(rawData);

ko.applyBindings();
