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
            .otherwise({
                redirectTo: '/login'
            });
    }])
    .run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
        // ✅ Prevent direct access to dashboard without logging in
        $rootScope.$on('$routeChangeStart', function(event, next) {
            if (next.templateUrl === 'app/views/dashboard.html' && !UserService.isUserLoggedIn()) {
                event.preventDefault();
                $location.path('/login');
            }
        });
    }]);
