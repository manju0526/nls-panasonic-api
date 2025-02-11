angular.module('panasonicApp').service('AuthService', ['$http', '$q', function($http, $q) {
    const API_URL = window.env.API_URL || 'http://localhost:8888/api'; // ✅ Ensure API URL is correct

    this.login = function(username, password) {
        console.log('Sending login request:', username, password); // ✅ Debugging

        return $http.post(`${API_URL}/login`, { username, password })
            .then(function(response) {
                console.log('Server Response:', response); // ✅ Debugging
                return { success: true, message: 'Login successful', orgName: response.data.orgName };
            })
            .catch(function(error) {
                console.log('Error response:', error); // ✅ Debugging
                let message = 'An error occurred';
                if (error.status === 401) {
                    message = 'Invalid credentials';
                } else if (error.status === 500) {
                    message = 'Server error';
                }
                return $q.reject({ success: false, message });
            });
    };
}]);
