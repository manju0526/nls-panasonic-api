angular.module('panasonicApp').controller('EditToolbarController', function($scope) {

    $scope.goHome = function() {
      alert("Home action triggered.");
    };
  
    $scope.addRecord = function() {
      alert("Add record action triggered.");
    };
  
    $scope.saveRecord = function() {
      // Replace with actual form or data saving logic
      alert("Save record action triggered.");
    };
  
    $scope.deleteRecord = function() {
      // Replace '1' with dynamic record ID as needed
    alert  ("Delete record action triggered.");
    };
  
    $scope.openQuery = function() {
      alert("Query functionality triggered.");
    };
  
  });
  