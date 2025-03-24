angular.module('panasonicApp').controller('SOSummaryScreenController', function ($scope, $http, $rootScope, UserService) {
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.displayList = [];
    $scope.totalRecords = 0;
    $scope.loading = false;
    $scope.columns = [
        { field: 'id', label: 'SO#', width: '0%', align: 'left' },
        { field: 'orgcur_id', label: 'PC Order#', width: '0%', align: 'left' },
        { field: 'received_date', label: 'Receive Date', width: '0%', align: 'left' },
        { field: 'trans_type', label: 'Product Type', width: '0%', align: 'left' },
        { field: 'trade_type', label: 'Trade Type', width: '0%', align: 'left' },
        { field: 'order_type', label: 'Order Type', width: '0%', align: 'left' },
        { field: 'short_name', label: 'Orderer', width: '0%', align: 'left' },
        { field: 'orgp_id_1', label: 'Accountee', width: '0%', align: 'left' },
        { field: 'orgp_id_2', label: 'Consignee', width: '0%', align: 'left' },
        { field: 'orgp_id_5', label: 'Original Buyer', width: '0%', align: 'left' },
        { field: 'orgserpo_id_2', label: 'Final Dest', width: '0%', align: 'left' },
        { field: 'customer_po_number', label: 'Customer Po Number', width: '0%', align: 'left' },
        { field: 'customer_request_date', label: 'Customer Req. Date', width: '0%', align: 'left' },
        { field: 'transport_mode', label: 'T.Mode', width: '0%', align: 'left' },
        { field: 'order_priority', label: 'Order Priority', width: '0%', align: 'left' },
        { field: 'reference_1', label: 'MECA#', width: '0%', align: 'left' },
        { field: 'status', label: 'Status', width: '0%', align: 'left' },
        { field: 'gtm_status', label: 'GTM Status', width: '0%', align: 'left' },
        { field: 'gtm_status_date', label: 'GTM Status Date', width: '0%', align: 'left' }
    ];

    $scope.sortConfig = {
        column: '',
        direction: ''
    };

    // Load all SAles order
    $scope.refreshData = function () {
        $scope.loading = true;
        $scope.salesOrders = [];

        $http.get("/api/so/listAll/" + UserService.getOrgName()) // replace with your endpoint
            .then(function (response) {
                console.log("Sales Orders:", response.data);
                $scope.salesOrders = response.data;
                $scope.loadPageRecords();
                $scope.loading = false;
            }, function (error) {
                alert("Error fetching sales orders", error);
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

    $scope.filterByColumns = function (so) {
        return matchWithWildcard($scope.search_id, so.salesOrderId.id) &&
        matchWithWildcard($scope.search_orgcurId, so.orgcurId) &&
        matchWithWildcard($scope.search_receivedDate, so.receivedDate) &&
        matchWithWildcard($scope.search_transType, so.transType) &&
        matchWithWildcard($scope.search_tradeType, so.tradeType) &&
        matchWithWildcard($scope.search_orderType, so.orderType) &&
        matchWithWildcard($scope.search_shortName, so.orgpId) &&
        matchWithWildcard($scope.search_orgpId1, so.orgpId1) &&
        matchWithWildcard($scope.search_orgpId2, so.orgpId2) &&
        matchWithWildcard($scope.search_orgpId5, so.orgpId5) &&
        matchWithWildcard($scope.search_orgSerpoId2, so.orgserpoId2) &&
        matchWithWildcard($scope.search_customerPoNumber, so.customerPoNumber) &&
        matchWithWildcard($scope.search_customerRequestDate, so.customerRequestDate) &&
        matchWithWildcard($scope.search_transportMode, so.transportMode) &&
        matchWithWildcard($scope.search_orderPriority, so.orderPriority) &&
        matchWithWildcard($scope.search_reference1, so.reference1) &&
        matchWithWildcard($scope.search_status, so.status) &&
        matchWithWildcard($scope.search_gtmStatus, so.gtmStatus) &&
        matchWithWildcard($scope.search_gtmStatusDate, so.gtmStatusDate);
    };

    $scope.loadPageRecords = function () {
        let filteredList = $scope.salesOrders.filter($scope.filterByColumns);

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
        $scope.salesOrders.sort((a, b) => {
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
            console.log("Target ID:", targetId);
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

    $scope.onEnterFilter = function (event) {
        if (event.which === 13) {  // Enter key
            $scope.currentPage = 1;
            $scope.loadPageRecords();
        }
    };

    $scope.edit = function () {
        $rootScope.currentView = '/app/views/oms/SOEditScreen.html';
    }

});
