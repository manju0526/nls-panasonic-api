angular.module('panasonicApp').service('UserService', function() {
    this.setUsername = function(name) {
        sessionStorage.setItem('username', name);
    };

    this.getUsername = function() {
        return sessionStorage.getItem('username') || null;
    };

    this.setOrgName = function(org) {
        sessionStorage.setItem('orgName', org);
    };

    this.getOrgName = function() {
        return sessionStorage.getItem('orgName') || 'Unknown';
    };

    this.isUserLoggedIn = function() {
        return !!sessionStorage.getItem('username');
    };
});
