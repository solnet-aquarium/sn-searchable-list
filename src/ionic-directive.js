(function () {
  "use strict";

  angular.module('demo.directives')
    .directive('searchableSelect', function () {
      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div class="searchlist"><form><span><input placeholder="Search" type="text" ng-change="query()" ng-model="term" /></form ng-hide="hideSearch"></span><ion-scroll delegate-handle="{{handle}}" class="scrollable-select" direction="y"><ul ng-transclude></ul></ion-scroll></div>',
        scope: {
          result: '=',
          items: '=',
          search: '='
        },
        controller: function ($scope, $filter, $ionicScrollDelegate, $location, $timeout) {
          $scope.term = '';
          $scope.handle = Math.random().toString(36).substring(7);

          var firstActive = true;

          $scope.$watch('result', function(newVal,oldVal) {
            if(newVal === '' && oldVal !== '') {
              $ionicScrollDelegate.$getByHandle($scope.handle).scrollTop(true);
            }
          });

          var fullItems = angular.copy($scope.items);
          $scope.hideSearch = $scope.items.length < 10;

          this.activate = function (item) {
            $scope.result = $scope.active = item;
          };

          this.isActive = function (item, element) {
            var isActive = $scope.result === item;
            if (isActive) {
              $location.hash(item.id);
              if (element.position().top > 180 && firstActive === true) {
                $timeout($ionicScrollDelegate.$getByHandle($scope.handle).scrollTo(0,element.position().top),0);
              }
              firstActive = false;
            }
            return isActive;
          };

          $scope.isVisible = function () {
            return !$scope.hide && ($scope.focused || $scope.mousedOver);
          };

          $scope.query = function () {
            var query = $scope.search($scope.term, fullItems);

            $scope.items = query;
            $ionicScrollDelegate.$getByHandle($scope.handle).scrollTop(true);
          };

        },
        link: {
          pre: function preLink(scope, element, attrs, controller) {

          },
          post: function postLink(scope, element, attrs) {

          }
        }
      };
    });


  angular.module('demo.directives')
    .directive('searchableListItem', function () {
      return {
        require: '^searchableSelect',
        link: function (scope, element, attrs, controller) {

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
})();

