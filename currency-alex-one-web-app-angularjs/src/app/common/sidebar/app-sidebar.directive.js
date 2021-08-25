/**
 * Directive to dispaly sidebar
 * 
 * @module app/common/sidebar/app-sidebar.directive.js
 */

/**
 * Directive to dispaly sidebar
 * 
 * @example <app-sidebar></app-sidebar>
 * @member app-sidebar
 */
var appSidebar = {
  templateUrl: "./app-sidebar.directive.html",
  controller: "AppSidebarController",
};

angular.module("common").component("appSidebar", appSidebar);
