angular.module('panasonicApp').controller('DashboardController', ['$scope', '$location', 'UserService', 
    function($scope, $location, UserService) {
        $scope.username = UserService.getUsername();
        $scope.orgName = UserService.getOrgName();
        $scope.currentDate = new Date();

       // ✅ Redirect to login if user is not authenticated
       if (!$scope.username) {
        window.location.href = '../../index.html';  // ✅ Redirects to main login page
    }

    $scope.chgOrg = function(){
        alert("Changing Organization");
        window.location.href = './changeOrganization.html';
    }

    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '../../index.html';  // ✅ Redirects to login on logout
    };
    }
]);
