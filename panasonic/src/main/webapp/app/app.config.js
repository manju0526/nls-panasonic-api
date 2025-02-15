angular.module('panasonicApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'LoginController'
            })
            .when('/dashboard', {
                templateUrl: 'app/views/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/changeOrg', {
                templateUrl: '/app/views/changeOrganization.html',
                controller: 'ChangeOrgController'
            })
            .when('/empty', {
                templateUrl: '/app/views/empty.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }]);
