angular.module('panasonicApp').controller('ChangeOrgController', function ($scope, $location, $http, UserService , $rootScope) {

    // Sample Organizations & Groups Data
    $scope.organizations = [
        { name: "PLGA" },
        { name: "PLHK" },
        { name: "PIGH" }
    ];

    $scope.groups = [
        { name: "BL" },
        { name: "BD" },
        { name: "NS" }
    ];

    // Save Changes
    $scope.saveChanges = function () {
        if (!$scope.selectedOrg ) {
            alert("Please select Organization.");
            document.getElementById("organizationField").focus();
            return;
        }

        if (!$scope.selectedGroup) {
            alert("Please select Group.");
            document.getElementById("groupField").focus();
            return;
        }
        if (!$scope.selectedStatus) {
            alert("Please select Status.");
            document.getElementById("statusField").focus();
            return;
        }

        var requestData = {
            orgId: $scope.selectedOrg.name,
            orggpId: $scope.selectedGroup.name,
            status: $scope.selectedStatus,
            createdBy: UserService.getUsername(),
            createdAt: UserService.getUsername(),
            modifiedBy: UserService.getUsername(),
            modifiedAt: UserService.getUsername(),
        };

        console.log(requestData);

        $http.post('http://localhost:8888/api/saveOrganization', requestData, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function (response) {
            alert(response.data.message);

            UserService.setOrgName(requestData.orgId);
            UserService.setGroup(requestData.orggpId);
            
            $rootScope.$broadcast('orgChanges', requestData);
        })
        .catch(function (error) {
            alert("Failed to save changes");
            console.error(error);
        });
    };

    // Cancel Changes
    $scope.Cancel = function () {
        $location.path('/empty');
    };
});
