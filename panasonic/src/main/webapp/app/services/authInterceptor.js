angular.module('panasonicApp').factory('AuthInterceptor', ['$q', '$location', function ($q, $location) {
    return {
        request: function (config) {
            let token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token; // ✅ Attach JWT token
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) { 
                console.error("Unauthorized request - Redirecting to login.");
                localStorage.removeItem('token'); // ✅ Clear token on unauthorized
                sessionStorage.clear();
                $location.path('/login');
            }
            return $q.reject(response);
        }
    };
}]);

// ✅ Register Interceptor
angular.module('panasonicApp').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);
