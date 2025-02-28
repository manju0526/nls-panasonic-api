angular.module('panasonicApp').controller('DashboardController', ['$scope', '$location', '$http', 'UserService', 'AuthService',
    function ($scope, $location, $http, UserService, AuthService) {
        $scope.username = UserService.getUsername();
        $scope.orgName = "";
        $scope.group = "";
        $scope.dc = 'NA';
        $scope.currentDate = new Date();

        // ✅ Redirect to login if user is not authenticated
        if (!$scope.username || !localStorage.getItem('token')) {
            window.location.href = '/login';  
            return;
        }

        // ✅ Fetch Organization Details from API on Login
        function fetchOrganizationDetails() {
            $http.get('http://localhost:8888/api/organization/' + $scope.username)
                .then(function (response) {
                    console.log("API Response:", response.data);

                    if (response.data) {
                        $scope.orgName = response.data.orgId || "";
                        $scope.group = response.data.orgppId || ""; // Ensure correct key

                        // ✅ Update UserService with API data
                        UserService.setOrgName($scope.orgName);
                        UserService.setGroup($scope.group);
                    }
                })
                .catch(function (error) {
                    console.error("Error fetching organization details:", error);
                });
        }

        // ✅ Load organization details when dashboard loads
        fetchOrganizationDetails();

        // ✅ Listen for Organization Changes from ChangeOrgController
        $scope.$on('orgChanges', function (event, data) {
            console.log("Updating dashboard with new organization data:", data);

            $scope.orgName = data.orgId;
            $scope.group = data.orgppId; 

            // ✅ Update UserService to persist changes
            UserService.setOrgName(data.orgId);
            UserService.setGroup(data.orgppId);
        });

        // ✅ Redirect to Change Organization Page
        $scope.chgOrg = function () {
            $location.path('/changeOrg');
        };

        // ✅ Logout Function
        $scope.logout = function () {
            sessionStorage.clear();
            AuthService.logout(); // ✅ Clear token on logout
            window.location.href = '/login';
        };
    }
]);
