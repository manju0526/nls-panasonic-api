angular.module('panasonicApp').controller('orgSummaryScreenController', function ($scope, $http, $rootScope) {
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.orgList = [];
    $scope.displayList = [];
    $scope.totalRecords = 0;
    $scope.totalPages = 0;

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

    // Load all organizations
    $scope.refreshData = function () {
        $scope.loading = true;
        $http.get('/api/organization/listAll').then(function (response) {
            $scope.orgList = response.data;
            $scope.loadPageRecords();
            $scope.loading = false;
        }, function (error) {
            alert(error.data.message);
            $scope.loading = false;
        });
    };

    $scope.refreshData(); // Initial load

    function matchWithWildcard(input, value) {
        if (!input) return true;
        let escaped = input.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
        let regexPattern = '^' + escaped.replace(/%/g, '.*') + '$';
        let regex = new RegExp(regexPattern, 'i');
        return regex.test(value);
    }

    $scope.filterByColumns = function (org) {
        return matchWithWildcard($scope.search_id, org.orgId) &&
            matchWithWildcard($scope.search_org, org.name) &&
            matchWithWildcard($scope.search_group, org.orggpId) &&
            matchWithWildcard($scope.search_status, org.status);
    };

    $scope.loadPageRecords = function () {
        let filteredList = $scope.orgList.filter($scope.filterByColumns);

        // Apply current sort before paginating:
        if ($scope.sortConfig.column) {
            filteredList.sort((a, b) => {
                let valA = (a[$scope.sortConfig.column] || '').toString().toLowerCase();
                let valB = (b[$scope.sortConfig.column] || '').toString().toLowerCase();
                if (valA < valB) return ($scope.sortConfig.direction === 'ASC') ? -1 : 1;
                if (valA > valB) return ($scope.sortConfig.direction === 'ASC') ? 1 : -1;
                return 0;
            });
        }
    
        $scope.totalRecords = filteredList.length;
        $scope.totalPages = Math.ceil(filteredList.length / $scope.pageSize);
        if ($scope.currentPage > $scope.totalPages) {
            $scope.currentPage = 1;
        }
        let startIndex = ($scope.currentPage - 1) * $scope.pageSize;
        let endIndex = startIndex + $scope.pageSize;
        $scope.displayList = filteredList.slice(startIndex, endIndex);
    };

    $scope.pgSelect = function (pageNumber) {
        if (pageNumber > 0 && pageNumber <= $scope.totalPages) {
            $scope.currentPage = pageNumber;
            $scope.loadPageRecords();
        }
    };

    $scope.sortBy = function (column) {
        if ($scope.sortConfig.column === column) {
            $scope.sortConfig.direction = ($scope.sortConfig.direction === 'ASC') ? 'DESC' : 'ASC';
        } else {
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
        $scope.loadPageRecords(); // Refresh display after sort
    };

    $scope.getSortIcon = function (column) {
        if ($scope.sortConfig.column === column) {
            return $scope.sortConfig.direction === 'ASC' ? '/assets/images/asc.gif' : '/assets/images/desc.gif';
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
        $scope.$applyAsync();
    };

    $scope.goHome = function () {
        $scope.refreshData();
    };

    $scope.openQuery = function () {
        $scope.refreshData();
    };

    $scope.onEnterFilter = function(event) {
        if (event.which === 13) {  // Enter key
            $scope.currentPage = 1;
            $scope.loadPageRecords();
        }
    };

});
