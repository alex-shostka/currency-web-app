/**
 * Directive to dispaly app
 */
var app = {
  templateUrl: "./app.directive.html",
  controller: "AppController",
};

angular
  .module("common")
  .component("app", app)
  .config(function ($stateProvider) {
    $stateProvider.state("app", {
      url: "/app",
      component: "app",
    });
  });
