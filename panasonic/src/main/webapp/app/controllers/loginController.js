angular.module('panasonicApp').controller('LoginController', ['$scope','$http', 'AuthService', 'UserService',
    function ($scope, $http,AuthService, UserService) {
        $scope.user = { username: '', password: '' };
        $scope.errorMessage = '';

        $scope.login = function () {

            AuthService.login($scope.user.username, $scope.user.password).then(function (response) {

                if (response.success) {
                    UserService.setUsername($scope.user.username);
                    UserService.setOrgName(response.orgName || 'PLGA');
                    UserService.setGroup(response.group || 'BL');

                    localStorage.setItem('token', response.token); // ✅ Store token in local storage

                    console.log('Login successful' + UserService.getGroup());

                    window.location.href = 'app/views/dashboard.html'; // ✅ Redirect

                } else {
                    $scope.errorMessage = response.message;
                }
            }).catch(function (error) {
                $scope.errorMessage = error.message || "Login failed.";
            });
        };


        $scope.PasswordShow = function () {
            var passwordField = document.getElementById("password");
            if (passwordField.type === "password") {
                passwordField.type = "text";
            } else {
                passwordField.type = "password";
            }
        };

        $scope.forgotPassword = function () {
            
            $http.post('/api/forgotPassword', { username: $scope.user.username })
            .then(function (response) {
                $scope.successMessage = "Password reset link sent to your registered email.";
                alert($scope.successMessage);
            })
            .catch(function (error) {
                $scope.errorMessage = error.data || "Please provide a valid username to Re-set password.";
                alert($scope.errorMessage);
            });
        
        
        
        };

    }

]);
