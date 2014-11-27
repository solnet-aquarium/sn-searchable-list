
var app = angular.module('demo', ['ngSanitize', 'searchListDirective']);

app.controller('demoCtrl', function($scope, $filter){
  var arrayList = [{'name':'test'},{'name':'Bongo'},{'name':'Anton'},{'name':'Racing'},{'name':'Flying'},{'name':'test'},{'name':'Bongo'},{'name':'Anton'},{'name':'Racing'},{'name':'Flying'}];
  $scope.testList = angular.copy(arrayList);
  $scope.testModel = '';

  $scope.search = function(term) {
    //fllter list
    if(term.length === 0) {
      return arrayList;
    }
    return $filter('orderBy')($filter('filter')(arrayList, term), 'name');
  };
});