
# Searchable List Directive - including Ionic Scrollable Searchable List version
[![Build Status](https://travis-ci.org/solnetdigital/sn-searchable-list.svg?branch=master)](https://travis-ci.org/solnetdigital/sn-searchable-list)
[![Code Climate](https://codeclimate.com/github/solnetdigital/sn-searchable-list/badges/gpa.svg)](https://codeclimate.com/github/solnetdigital/sn-searchable-list)
[![Test Coverage](https://codeclimate.com/github/solnetdigital/sn-searchable-list/badges/coverage.svg)](https://codeclimate.com/github/solnetdigital/sn-searchable-list)

>>>>>>> added ionic version and touch ups to the README

This is a simple AngularJS directive to filter a list for mobile with highlighting of selected elements as well as presenting
information to the user about the state of the list


## Using the boilerplate

The Ionic version has more features such as restoring to an item in the list as previously selected using ionic scroll.

Clone the project and install dependencies, then use Gulp to start the project.
```shell
git clone git@github.com:solnetdigital/angular-searchable-list.git searchable-list
cd searchable-list
npm install
bower install
gulp serve
```

How to use

items - this is for your list of items to filter
result - for the final selection
search - your filter function

ordering is your responsibility

```javascript
$scope.items = $filter('orderBy')($scope.items, 'name'); //change name to whatever value you are showing
```

Setup your search function for the directive
```javascript
$scope.search = function(term) {
    //fllter list
    if(term.length === 0) {
      return arrayList;
    }
    return $filter('orderBy')($filter('filter')(arrayList, term), 'name');
```
};

The list itself is on the controller scope.

The demo shows a working example of this directive.

## Contributions

Pull requests welcome - must have tests!

## Testing

### Single run

`npm test`

This will install dependencies and run a single test

### Continuous testing

`npm run test-watch`

This will watch the `src/` and `test/` directories and run the test suite when any changes are detected.

### License

MIT
