angular.module('panasonicApp').controller('DashboardController', [
    '$scope', '$rootScope', '$location', '$timeout', '$http', 'UserService', 'AuthService',
    function ($scope, $rootScope, $location, $timeout, $http, UserService, AuthService) {
        console.log("ChangeOrgController loaded");
        $scope.username = UserService.getUsername();
        $scope.orgName = "";
        $scope.group = "";
        $scope.dc = 'NA';
        $scope.currentDate = new Date();
        $rootScope.currentView = '';

        $scope.menus = [
            {
                name: "EVA Server", link: "#/eva", submenu: [
                    { name: "Organization", link: "/app/views/Organization/orgSummaryScreen.html" },
                    { name: "Reports", link: "#/webtop/reports" },
                    { name: "Settings", link: "#/webtop/settings" }
                ]
            },
            {
                name: "OMS", link: "#/oms", submenu: [
                    { name: "Sales Order", link: "#/webtop/dashboard" },
                    { name: "Purchase order", link: "#/webtop/reports" },
                    { name: "Packing List", link: "#/webtop/settings" }
                ]
            },
            {
                name: "Shipment", link: "#/shipment", submenu: [
                    { name: "Dashboard", link: "#/webtop/dashboard" },
                    { name: "Reports", link: "#/webtop/reports" },
                    { name: "Settings", link: "#/webtop/settings" }
                ]
            },
            {
                name: "Finance", link: "#/finance", submenu: [
                    { name: "Dashboard", link: "#/webtop/dashboard" },
                    { name: "Reports", link: "#/webtop/reports" },
                    { name: "Settings", link: "#/webtop/settings" }
                ]
            },
            {
                name: "WebTop",
                link: "#/webtop",
                submenu: [
                    { name: "Dashboard", link: "#/webtop/dashboard" },
                    { name: "Change Organization", link : "/app/views/changeOrganization.html"   },
                    { name: "Settings", link: "/app/views/EditToolbar.html" }
                ]
            }
        ];


        // ✅ Default footer values
        function resetFooter() {
            $rootScope.footerMessage = "";
            $rootScope.footerColor = "maroon";
            $rootScope.footerIcon = false;
        }

        resetFooter(); // ✅ Set initial footer state

        // ✅ Reset footer on every navigation
        $rootScope.$on('$routeChangeStart', function () {
            resetFooter();
        });

        // ✅ Redirect to login if user is not authenticated
        if (!$scope.username || !localStorage.getItem('token')) {
            window.location.href = '/login';
            return;
        }

        // ✅ Fetch Organization Details
        function fetchOrganizationDetails() {
            $http.get('/api/organization/' + $scope.username)
                .then(function (response) {
                    if (response.data) {
                        $scope.orgName = response.data.orgId || "";
                        $scope.group = response.data.orgppId || "";

                        // ✅ Update UserService with API data
                        UserService.setOrgName($scope.orgName);
                        UserService.setGroup($scope.group);
                    }
                })
                .catch(function (error) {
                    console.error("Error fetching organization details:", error.message);
                });
        }

        fetchOrganizationDetails(); // ✅ Load org details when dashboard loads

        // ✅ Listen for Organization Changes from ChangeOrgController
        $scope.$on('orgChanges', function (event, data) {
            $scope.orgName = data.orgId;
            $scope.group = data.orgppId;

            // ✅ Update UserService
            UserService.setOrgName(data.orgId);
            UserService.setGroup(data.orgppId);
        });

        // ✅ Navigation Functions
        $scope.chgOrg = function () {
            //$location.path('/changeOrg');
            $rootScope.currentView = '/app/views/changeOrganization.html';
         // $location.path('/changeOrg');

        };

        $scope.logout = function () {
            sessionStorage.clear();
            AuthService.logout();
            window.location.href = '/login';
        };

        // ✅ Unified Footer Update Function
        $rootScope.updateFooter = function (message, color) {
            $timeout(function () {
                $rootScope.footerMessage = message || "";
                $rootScope.footerColor = color || "maroon";
                $rootScope.footerIcon = !!message;
            });
        };

        // ✅ Footer Message Alert
        $scope.showFooterAlert = function () {
            alert($rootScope.footerMessage);
        };

        $scope.navigate = function (link) {
            $rootScope.currentView = link;
        };
    }
]);
