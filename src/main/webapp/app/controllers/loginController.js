angular.module('panasonicApp').controller('LoginController', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.login = function() {
        AuthService.login($scope.username, $scope.password).then(function(response){
            if(response.success){
                alert('Login successful');
            }else{
                alert('Login failed');
            }
            
        }).catch(function(error){
            alert('Error: '+error.message);
        }); 
    };

    $scope.togglePasswordVisibility = function() {
        var passwordField = document.getElementById('password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    };
}]);