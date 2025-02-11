angular.module('panasonicApp').controller('LoginController', ['$scope', 'AuthService', 'UserService',
    function($scope, AuthService, UserService) {
        $scope.user = { username: '', password: '' };
        $scope.errorMessage = '';

        $scope.login = function() {

            AuthService.login($scope.user.username, $scope.user.password).then(function(response) {

                if (response.success) {
                    UserService.setUsername($scope.user.username);
                    UserService.setOrgName(response.orgName || 'PLGA');

                    window.location.href = 'app/views/dashboard.html'; // ✅ Redirect
                } else {
                    $scope.errorMessage = response.message;
                }
            }).catch(function(error) {
                $scope.errorMessage = error.message || "Login failed.";
            });
        };
    }
]);
