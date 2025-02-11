angular.module('panasonicApp').controller('ChangeOrgController', function($scope, userService) {
    
    // Load organizations, groups, and statuses
    $scope.organizations = [
        { id: 1, name: 'Org A' },
        { id: 2, name: 'Org B' },
        { id: 3, name: 'Org C' }
    ];

    $scope.groups = [
        { id: 1, name: 'Group X' },
        { id: 2, name: 'Group Y' },
        { id: 3, name: 'Group Z' }
    ];

    $scope.selectedOrg = $scope.organizations[0];
    $scope.selectedGroup = $scope.groups[0];
    $scope.selectedStatus = "Active";

    // Save Changes
    $scope.saveChanges = function() {
        alert("Changes Saved: " + $scope.selectedOrg.name + ", " + $scope.selectedGroup.name + ", " + $scope.selectedStatus);
    };

    // Delete Entry
    $scope.deleteEntry = function() {
        alert("Entry Deleted");
    };
});
