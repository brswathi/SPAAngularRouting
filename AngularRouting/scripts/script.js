/// <reference path="angular.js" />


var myApp = angular.module("testapp", ["ngRoute"]);
myApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider.caseInsensitiveMatch = true;
                        $routeProvider
                         .when("/home", {
                             templateUrl: "/Templates/home.html",
                             controller: "homeController as homeCtrl"
                         })
                         .when("/courses", {
                             templateUrl: "/Templates/courses.html",
                             controller: "coursController", // it is correct
                             //controller:" coursController"  error was i left space after double quote
                             controllerAs:"courseCtrl"
                         })
                         .when("/students", {
                             templateUrl: "/Templates/students.html",
                             controller: "studentsController as studentsCtrl",
                             resolve: {
                                 studentslist: function ($http)
                                 {
                                     return $http.get("StudentService.asmx/GetAllStudents")
                                         .then(function (response)
                                         {
                                             return response.data;
                                         })
                                 }
                             }
                         })
                          .when("/students/:id", {
                                templateUrl: "/Templates/studentDetails.html",
                                controller: "studentDetailsController",
                              controllerAs:"stdntDetailsCtrl"
                          })
                          .when("/studentsSearch/:name?", {
                              templateUrl: "Templates/studentsSearch.html",
                              controller: "studentsSearchController",
                              controllerAs: "studentsSearchCtrl"
                            })
                         .otherwise({
                             redirectTo: "Templates/home.html",
                             controller:"homeController"
                         });
                        $locationProvider.html5Mode(true);
                            

                    }]);
myApp.controller("coursController", function () {
    this.courses = [ "c" , "c++" ];

});
myApp.controller("homeController", function () {
   this.message = "Home Page is valid";
});
                    
myApp.controller("studentsController", function (studentslist,$route, $location) {
    var vm = this;
    vm.studentSearch = function () {
        if (vm.name)
            $location.url("/studentsSearch/" + vm.name);
        else
            $location.url("/studentsSearch");
    }
   /* $scope.$on("$routeChangeStart", function (event, next, current) {
        if (!confirm("Are you sure you want to navigate away from this page"+next.$$route.originalPath))
        {
            event.preventDefault();
        }
    });*/
    
    vm.reloadData = function () {
        $route.reload();
        
    };
    vm.students = studentslist;
   
});
myApp.controller("studentDetailsController", function ($http, $routeParams) {
    var vm1 = this;
    $http({
        url: ("StudentService.asmx/GetStudent"),
        method: 'GET',
        params: { id: $routeParams.id }

    })
    .then(function (response) {
        vm1.student = response.data;
    });
});
myApp.controller("studentsSearchController", function ($http, $routeParams) {
    var vm = this;
    if ($routeParams.name) {
        $http({
            url: "StudentService.asmx/GetStudentsByName",
            method: "get",
            params: { name: $routeParams.name }
        })
            .then(function (response) {
                vm.students = response.data;
            })
    }
    else {
        $http.get("StudentService.asmx/GetAllStudents")
            .then(function (response) {
                vm.students = response.data;
            });
    }
});
   

                        

