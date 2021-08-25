/**
 * Directive to dispaly header
 * 
 * @module app/common/header/header.directive
 */

/**
 * Directive to dispaly header
 * 
 * @example <header></header>
 * @member header
 */
var header = {
  templateUrl: "./header.directive.html",
  controller: "HeaderController",
};

angular.module("common").component("header", header);
