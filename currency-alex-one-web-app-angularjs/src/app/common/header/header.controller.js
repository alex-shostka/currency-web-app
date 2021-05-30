function HeaderController($rootScope) {
  var ctrl = this;
  $rootScope.isActive = false;

  ctrl.onToggle = function () {
    $rootScope.isActive = !$rootScope.isActive;
  };
}

angular.module("common").controller("HeaderController", HeaderController);
