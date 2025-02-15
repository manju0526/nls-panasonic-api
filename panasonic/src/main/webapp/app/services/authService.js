angular.module('panasonicApp').service('AuthService', ['$http', '$q', function ($http, $q) {
    const API_URL = window.env.API_URL;

    this.login = function (username, password) {

        return $http.post(`${API_URL}/login`, { username, password })
            .then(function (response) {
                return { success: true, message: 'Login successful', orgName: response.data.orgName, group: response.data.group };
            })
            .catch(function (error) {
                let message = 'An error occurred';
                if (error.status === 404) {
                    message = 'Invalid credentials. Please enter valid username and password';
                } else {
                    message = 'API not activated';
                }
                alert(message); // ✅ Alert user of error
                return $q.reject({ success: false, message });
            });
    };
}]);
