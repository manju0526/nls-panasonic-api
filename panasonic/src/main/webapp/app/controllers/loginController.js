angular.module('panasonicApp').controller('LoginController', ['$scope', 'AuthService', 'UserService',
    function($scope, AuthService, UserService) {
        $scope.user = { username: '', password: '' };
        $scope.errorMessage = '';

        $scope.login = function() {
            console.log('Login function triggered'); // ✅ Debugging

            AuthService.login($scope.user.username, $scope.user.password).then(function(response) {
                console.log('AuthService Response:', response); // ✅ Debugging

                if (response.success) {
                    UserService.setUsername($scope.user.username);
                    UserService.setOrgName(response.orgName || 'PLGA');

                    console.log('Navigating to dashboard.html'); // ✅ Debugging
                    window.location.href = 'app/views/dashboard.html'; // ✅ Redirect
                } else {
                    $scope.errorMessage = response.message;
                    console.log('Login failed:', response.message); // ✅ Debugging
                }
            }).catch(function(error) {
                $scope.errorMessage = error.message || "Login failed.";
                console.log('Error:', error); // ✅ Debugging
            });
        };
    }
]);
