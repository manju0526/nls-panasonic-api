angular.module('panasonicApp').service('AuthService', ['$http', '$q', function ($http, $q) {

    this.login = function (username, password) {

        return $http.post(`http://localhost:8888/api/login`, { username, password })
            .then(function (response) {

                localStorage.setItem('token', response.data.token); // ✅ Store token in local storage
                console.log('Orgname'+response.data.orgName);
                return { success: true, message: 'Login successful', orgName: response.data.orgName, group: response.data.group, token: response.data.token };
            })
            .catch(function (error) {
                console.log('ERROR::::', error);
                let message=null;
                if (error.status === 401) {
                    message = 'Invalid credentials. Please enter valid username and password';
                } else {
                    message = 'API not activated';
                }
                alert(message); // ✅ Alert user of error
                return $q.reject({ success: false, message });
            });
    };

    this.getToken = function () {
        return localStorage.getItem('token');
    };

    this.logout = function () {
        localStorage.removeItem('token');
        sessionStorage.clear(); // ✅ Clear session data on logout
    };

}]);
