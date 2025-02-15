angular.module('panasonicApp').service('UserService', function () {
    this.setUsername = function (name) {
        sessionStorage.setItem('username', name);
    };

    this.getUsername = function () {
        return sessionStorage.getItem('username');
    };

    this.setOrgName = function (org) {
        sessionStorage.setItem('orgName', org);
    };

    this.getOrgName = function () {
        return sessionStorage.getItem('orgName');
    };

    this.setGroup = function (group) {
        sessionStorage.setItem('group', group);
    };

    this.getGroup = function () {
        return sessionStorage.getItem('group');
    };

    this.isUserLoggedIn = function () {
        return !!sessionStorage.getItem('username');
    };


});
