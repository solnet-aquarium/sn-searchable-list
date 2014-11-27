'use strict';

describe('searchableList Directives', function () {
  var scope, $compile, $rootScope, $filter,  element, changeInputValueTo;

  function createDirective(template) {
    var elm;

    elm = angular.element(template);
    angular.element(document.body).prepend(elm);
    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  var searchFunc = function(term) {
    //fllter list
    if(term.length === 0) {
      return scope.testList;
    }
    return $filter('filter')(scope.testList, term);
  };


  beforeEach(module('searchListDirective'));

  beforeEach(inject(function(_$rootScope_, _$compile_,_$filter_, $sniffer) {
    $filter = _$filter_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;

    changeInputValueTo = function (element, value) {
      element.val(value);
      element.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
      scope.$digest();
    };

    scope.testModel = "";
    scope.testList = [{'name':'test'},{'name':'Bongo'},{'name':'Anton'},{'name':'Racing'},{'name':'Flying'},{'name':'test'},{'name':'Bongo'},{'name':'Anton'},{'name':'Racing'},{'name':'Flying'}];

    scope.search = searchFunc;

    element = createDirective('<searchable-list items="testList" result="testModel" search="search">' +
            '<li searchable-list-item="item" ng-repeat="item in testList">{{ item.name }}</li>' +
            '</searchable-list>');

  }));

  afterEach(function(){
    element.remove();
  });


    describe('when created', function () {
      var list;
      beforeEach(function(){
        list = element.find('li');
      });

      it('should order the list alphabetically', function() {

        expect(list[1].innerText).toEqual('Anton');
      });

    });

  describe('click events', function() {
    var list;
    beforeEach(function(){
      list = element.find('li');
      list[0].click();
      list[1].click();
    });

    it('should only highlight one element in the list', function() {
      expect(list[0].classList.contains('active')).toBe(false);
    });

    it('should set active to the scoped result', function() {
      expect(scope.testModel).toEqual({ name : 'Anton', $$hashKey : '01I' });
    })

  });

  describe('searching the list', function(){
    var list, input;
    beforeEach(function() {
      list = element.find('li');
      input = element.find('input');
    });

    it('should keep the list in alphabetical order', function() {

      changeInputValueTo(input,'test');
      expect(list.prevObject[0].innerText).toEqual('\ntest\ntest');

      changeInputValueTo(input,'a');
      expect(list.prevObject[0].innerText).not.toEqual('\ntest\ntest');
    });
  });

});