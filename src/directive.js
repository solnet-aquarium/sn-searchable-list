'use strict';
var app = angular.module('searchListDirective', []);
app.directive('searchableList', function () {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    template: '<div class="searchlist"><form><span><input placeholder="Search" type="text" ng-change="query()" ng-model="term" /></form></span><ul ng-transclude></ul></div>',
    scope: {
      result:'=',
      items:'=',
      search: '='
    },
    controller: function ($scope, $filter) {
          $scope.term = '';
          var fullItems = angular.copy($scope.items);
          $scope.hideSearch = $scope.items.length < 10;

          this.activate = function (item) {
            $scope.result = $scope.active = item;
          };

          this.isActive = function (item) {
            return $scope.result === item;
          };

          $scope.isVisible = function () {
            return !$scope.hide && ($scope.focused || $scope.mousedOver);
          };

          $scope.query = function () {
            var query = $scope.search($scope.term, fullItems);

            $scope.items = query;
          };

        },
        link: {
          pre: function preLink(scope, element, attrs) {
          },
          post: function postLink(scope, element, attrs) {

          }
        }
      };
    });


app.directive('searchableListItem', function() {
    return {
        require: '^searchableList',
        link: function(scope, element, attrs, controller) {

            var item = scope.$eval(attrs.searchableListItem);

            scope.$watch(function () {
            return controller.isActive(item, element);
          }, function (active) {
            if (active) {
              element.addClass('active');
            } else {
              element.removeClass('active');
            }
          });

            element.bind('mouseenter', function (e) {
            scope.$apply(function () {
              controller.activate(item);
            });
          });

          element.bind('click', function (e) {
            scope.$apply(function () {
              controller.activate(item);
            });
          });
        }
    };
});
