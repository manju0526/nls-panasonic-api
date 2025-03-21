angular.module('panasonicApp').controller('orgSummaryScreenController', function ($scope, $http) {
    $scope.orgList = [];

    // Call the REST API to get all organizations
    $http.get('/api/organization/listAll').then(function (response) {
        $scope.orgList = response.data;   // Store data in orgList
        console.log('Org List:', $scope.orgList);
    }, function (error) {
        alert(error.data.message);
    });

    $scope.columns = [
        { field: 'orgId', label: 'ID', width: '10%', align: 'left' },
        { field: 'name', label: 'Name', width: '10%', align: 'left' },
        { field: 'orggpId', label: 'Group', width: '10%', align: 'left' },
        { field: 'status', label: 'Status', width: '10%', align: 'left' }
    ];

    $scope.sortConfig = {
        column: '',
        direction: ''
    };

    $scope.sortBy = function (column) {
        if ($scope.sortConfig.column === column) {
            // toggle direction
            $scope.sortConfig.direction = ($scope.sortConfig.direction === 'ASC') ? 'DESC' : 'ASC';
        } else {
            // set new column and default direction ASC
            $scope.sortConfig.column = column;
            $scope.sortConfig.direction = 'ASC';
        }

        $scope.orgList.sort((a, b) => {
            let valA = (a[column] || '').toString().toLowerCase();
            let valB = (b[column] || '').toString().toLowerCase();

            if (valA < valB) return ($scope.sortConfig.direction === 'ASC') ? -1 : 1;
            if (valA > valB) return ($scope.sortConfig.direction === 'ASC') ? 1 : -1;
            return 0;
        });
    };

    $scope.getSortIcon = function (column) {
        if ($scope.sortConfig.column === column) {
            return $scope.sortConfig.direction === 'ASC'
                ? '/assets/images/asc.gif'
                : '/assets/images/desc.gif';
        }
        return '';
    };

    $scope.isCollapsed = false;
    $scope.collapseIcon = "/assets/images/collapse.gif";

    $scope.clickHandler = function (event) {
        const el = event.currentTarget;
        if (el.classList.contains('outline')) {
            $scope.isCollapsed = !$scope.isCollapsed;
            $scope.collapseIcon = $scope.isCollapsed ? "/assets/images/expand.gif" : "/assets/images/collapse.gif";

            const targetId = el.id + "z";
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.style.display = $scope.isCollapsed ? 'none' : '';
            }
        }
        $scope.$applyAsync(); // Ensure UI updates
    };

    $scope.filterByColumns = function (org) {
        function matchWithWildcard(input, value) {
            if (!input) return true; // no filter applied
            // Escape special regex chars except %
            let escaped = input.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
            // Replace % with .* for wildcard matching
            let regexPattern = '^' + escaped.replace(/%/g, '.*') + '$';
            let regex = new RegExp(regexPattern, 'i'); // i = case-insensitive
            return regex.test(value);
        }
    
        return matchWithWildcard($scope.search_id, org.orgId) &&
               matchWithWildcard($scope.search_org, org.name) &&
               matchWithWildcard($scope.search_group, org.orggpId) &&
               matchWithWildcard($scope.search_status, org.status);
    };
    


});