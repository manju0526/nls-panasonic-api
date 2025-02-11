angular.module('panasonicApp').service('AuthService', ['$http', '$q', function($http, $q) {
    const API_URL = window.env.API_URL;

    this.login = function(username, password) {

        return $http.post(`${API_URL}/login`, { username, password })
            .then(function(response) {
                return { success: true, message: 'Login successful', orgName: response.data.orgName };
            })
            .catch(function(error) {
                let message = 'An error occurred';
                if (error.status === 404) {
                    message = 'Invalid credentials';
                } else if (error.status === 500) {
                    message = 'Server error';
                }
                alert(message); // ✅ Alert user of error
                return $q.reject({ success: false, message });
            });
    };
}]);
