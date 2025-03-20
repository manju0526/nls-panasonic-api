angular.module('panasonicApp').controller('ChangeOrgController', function ($scope, $location, $http, UserService, $rootScope) {

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

    // Default selections
    $scope.selectedOrg = null;
    $scope.selectedGroup = null;
    $scope.selectedStatus = null;

    function loadExistingData() {
        $http.get('/api/organization/' + UserService.getUsername())
            .then(function (response) {
                if (response.data) {
                    console.log('Org:', response.data.orgId);
                    console.log('Group:', response.data.orgppId);
                    console.log('Status:', response.data.status);

                    $scope.selectedOrg = $scope.organizations.find(org => org.name === response.data.orgId) || null;
                    $scope.selectedGroup = $scope.groups.find(group => group.name === response.data.orgppId) || null;
                    $scope.selectedStatus = response.data.status || null;
                }
            })
            .catch(function (error) {
                console.error("Error fetching organization details:", error);
            });
    }

    // Load existing data when page opens
    loadExistingData();

    // Save Changes
    $scope.saveChanges = function () {
        if (!$scope.selectedOrg) {
            alert("Please select an Organization.");
            return;
        }

        if (!$scope.selectedGroup) {
            alert("Please select a Group.");
            return;
        }

        if (!$scope.selectedStatus) {
            alert("Please select a Status.");
            return;
        }

        var requestData = {
            orgId: $scope.selectedOrg.name,
            orgppId: $scope.selectedGroup.name,
            status: $scope.selectedStatus,
            createdBy: UserService.getUsername(),
            createdAt: UserService.getUsername(),
            modifiedBy: UserService.getUsername(),
            modifiedAt: UserService.getUsername(),
        };

        console.log("Saving Data:", requestData);

        $http.post('/api/saveOrganization', requestData, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function (response) {
            

            // ✅ Update UserService with new values
            UserService.setOrgName(requestData.orgId);
            UserService.setGroup(requestData.orgppId);

            // ✅ Notify DashboardController about the changes
            $rootScope.$broadcast('orgChanges', requestData);

            // ✅ Redirect user after update
            $location.path('/dashboard');

            $rootScope.updateFooter(response.data.message, "green");
            alert(response.data.message);
        })
        .catch(function (error) {
            alert("Failed to save changes");
            $rootScope.updateFooter(response.data.message, "red");
            console.error(error);
        });
    };

    // Cancel Changes
    $scope.Cancel = function () {
        $rootScope.currentView = null;
        $rootScope.updateFooter(null, null);
    };
});
