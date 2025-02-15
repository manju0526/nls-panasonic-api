angular.module('panasonicApp').controller('DashboardController', ['$scope', '$location', 'UserService', 
    function($scope, $location, UserService) {
        $scope.username = UserService.getUsername();
        $scope.orgName = UserService.getOrgName();
        $scope.group = UserService.getGroup();
        $scope.dc = 'NA';
        $scope.currentDate = new Date();

       // ✅ Redirect to login if user is not authenticated
       if (!$scope.username) {
        window.location.href = '/login';  // ✅ Redirects to main login page
    }

    $scope.$on('orgChanges',function(event,data){
        $scope.orgName = data.orgId;
        $scope.group = data.orggpId;
    })

    $scope.chgOrg = function(){

        $location.path('/changeOrg')
    }

    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/login';  // ✅ Redirects to login on logout
    };
    }
]);
