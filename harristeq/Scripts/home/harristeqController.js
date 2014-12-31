harristeqApp.controller('harristeqController', function ($scope, harristeqSvc) {

    var supportsLocalStorage = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    var LS_TASKLIST = "taskList.tasks";
    var taskListViewModel = function () {
        var rtn = {
            tasks: [],
            taskNextId: 0,
            userId: 0,
            title: ""
        };
        return rtn;
    };

    var userTasksViewModel = function () {
        var rtn = {
            userId: 0,
            taskLists: [],
            userName: "dTown"
        };
        return rtn;
    };

    var getViewModelFromLocalStorage = function () {
        var rtn = null;
        if (localStorage[LS_TASKLIST] !== null) {
            rtn = JSON.parse(localStorage[LS_TASKLIST]);
        }
        return rtn;
    };

    $scope.saveTasksToLocalStorage = function () {
        if (!supportsLocalStorage()) { return false; }
        var rtn = new taskListViewModel();
        rtn.tasks = $scope.taskList().tasks;
        rtn.taskNextId = $scope.taskList().taskNextId;
        rtn.title = $scope.taskList().title;
        rtn.userId = $scope.taskList().userId;

        localStorage[LS_TASKLIST] = JSON.stringify(rtn);
        return true;
    };

    $scope.getTasksFromLocalStorage = function () {
        return localStorage[LS_TASKLIST];
    };

    $scope.getJsBin = harristeqSvc.getFromJsBin().then(function (results) {

        //alert(results);
        $scope.jsBin = results;
    });

    $scope.taskList = function (data) {
        var self = this;
        data = data || {};

        // Persisted properties
        self.taskListId = data.taskListId;
        self.userId = data.userId || 0;
        self.title = self.title || "My todos";
        self.tasks = self.tasks || [];
        self.taskNextId = self.taskNextId || 0;

        // Non-persisted properties
        self.isEditingListTitle = false;
        self.newTodoTitle = false;
        self.errorMessage = false;
        self.newTaskTitle = self.newTaskTitle || "";

        //--add task
        self.addTask = function (task) {
            self.taskNextId += 1;
            task.taskItemId = self.taskNextId + "";
            task.title = self.newTaskTitle;
            task.isDone = false;

            //alert(task.taskItemId);
            if (task.title !== "") {
                self.tasks.push(task);
                self.reSortTasks();
            }
            self.newTaskTitle = "";
        };

        var sortableEle;

        //--remove task
        self.removeTask = function (taskItemId) {
            var foundItem;
            var list = self.tasks;
            $.each(list, function (i) {
                try {
                    if (list[i].taskItemId === taskItemId) {
                        foundItem = list[i];
                        self.tasks.splice(i, 1);

                        //alert("here");
                        self.reSortTasks();
                        sortableEle.refresh();
                        return;
                    }
                } catch (e) {
                }
            });
        };

        self.reSortTasks = function () {
            var list = self.tasks;
            $.each(list, function (i) {
                try {
                    list[i].sortId = i;
                } catch (e) {
                }
            });

            $scope.saveTasksToLocalStorage();
        };

        self.loadTasksFromViewModel = function (taskVm) {
            if (taskVm !== null) {
                self.taskNextId = taskVm.taskNextId;
                self.tasks = taskVm.tasks;
            }
        };

        return self;
    };


    var task = function (data) {
        var self = this;
        data = data || {};

        // Persisted properties
        self.taskItemId = data.taskItemId || "0";
        self.title = data.title || "to be added";
        self.isDone = data.isDone;
        self.taskListId = data.todoListId;
        self.sortId = self.sortId || 0;

        //// Non-persisted properties
        //self.errorMessage = "";
    };

    $scope.afterTaskEdit = function () {
        $("#txtAdd").focus();
    };

    $scope.myTasks = function () {
        var self = this;
        var taskLists = [];
        self.addTaskList = function (taskList) {
            taskLists.push(taskList);
        };
    };

    $scope.doit = function () {
        var d = new task();
        $scope.taskList().addTask(d);
    };



    $scope.clearLocalStorage = function () {
        localStorage[LS_TASKLIST] = null;
    };

    $scope.init = function () {

        //alert($("#ulTaskList").html());

        sortableEle = $("#ulTaskList").sortable({
            start: $scope.dragStart,
            update: $scope.dragEnd
        });

        if (localStorage[LS_TASKLIST] === undefined) {
            localStorage[LS_TASKLIST] = null;
        }

        var vm = getViewModelFromLocalStorage();
        $scope.taskList().loadTasksFromViewModel(vm);


        $scope.startDate = "06/27/2014";
        $scope.endDate = "07/27/2014";
    };

    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    };

    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start');
        var end = ui.item.index();

        //get the item that was moved
        var itemToRemove = $scope.taskList().tasks[start];

        //remove item from where it was
        $scope.taskList().tasks.splice(start, 1);

        //add it to where it needs to be
        $scope.taskList().tasks.splice(end, 0, itemToRemove);
        $scope.$apply();

        $scope.taskList().reSortTasks();
    };

    $scope.blinkGreen = harristeqSvc.getBlinkGreen();

    $scope.blinkYellow = harristeqSvc.getBlinkYellow();

    $scope.blinkRed = harristeqSvc.getBlinkRed();

    $scope.loadFromJsBin = function () {
        var rtn = JSON.parse($scope.jsBin);

        $scope.taskList().loadTasksFromViewModel(rtn);
    };

    $scope.getGarminData = function () {
        var dateObj = {
            startDate: $scope.startDate,
            endDate: $scope.endDate
        };
        harristeqSvc.getGarminData(dateObj).then(function (results) {

            //alert(results);
            $scope.garminData = "show me potato salad => " + JSON.stringify(results);
        });
        
    };

    $scope.init();
});
