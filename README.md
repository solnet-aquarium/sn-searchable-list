# Searchable List Directive

This is a simple AngularJS directive to filter a list for mobile with highlighting of selected elements as well as presenting
information to the user about the state of the list

#### Using the boilerplate
Clone the project and install dependencies, then use Gulp to start the project.
```shell
git clone git@github.com:solnetdigital/angular-searchable-list.git searchable-list
cd my-directive
npm install
bower install
gulp serve
```

How to use

items - this is for your list of items to filter
result - for the final selection
search - your filter function

Setup your search function for the directive
```
$scope.search = function(term) {
    //fllter list
    if(term.length === 0) {
      return arrayList;
    }
    return $filter('orderBy')($filter('filter')(arrayList, term), 'name');
  };
```

The list itself is on the controller scope.

The demo shows a working example of this directive.


Pull requests welcome - must have tests!!

gulp test

### License
MIT
