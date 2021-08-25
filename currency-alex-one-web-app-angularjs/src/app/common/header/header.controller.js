/**
 * Defines controller for '<header>' directive
 * 
 * @module app/common/header/header.controller.js
 */

/**
 * Defines Header controller
 * 
 * @member HeaderController
 */
function HeaderController($rootScope) {
  var ctrl = this;
  $rootScope.isActive = false;

  ctrl.onToggle = function () {
    $rootScope.isActive = !$rootScope.isActive;
  };
}

angular.module("common").controller("HeaderController", HeaderController);
