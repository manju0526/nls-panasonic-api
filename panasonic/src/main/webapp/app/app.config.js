angular.module('panasonicApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/views/login.html',
                controller: 'LoginController'
            })
            .when('/dashboard', {
                templateUrl: 'app/views/welcome.html',
                controller: 'WelcomeController'
            })
            .when('/changeOrg', {
                templateUrl: 'app/views/changeOrganization.html',
                controller: 'ChangeOrgController'
            })
            .when('/empty', {
                templateUrl: 'app/views/empty.html'
            })
            .otherwise({
                redirectTo: '/login'
            });

        // Remove the default '!' from Angular hashes so URLs look like "#/login" instead of "#!/login"
        $locationProvider.hashPrefix('');
    }]);
