angular.module('panasonicApp').service('AuthService', ['$http', function($http) {
    this.login = function(username, password) {
        // Implement login logic here
        return $http.post('http://localhost:8888/api/login', {username: username, password: password})
        .then(function(response){
            if(response.status === 200){
                return { success: true, message: 'Login successful' };
            }else{
                return { success: false, message: 'Login failed' };
            }
        })
        .catch(function(error){
            return { success: false, message: 'Invalid credentials' };          
        });
    };
}]);