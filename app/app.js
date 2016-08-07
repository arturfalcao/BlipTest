require('angular')

//Main Controller
var MainController = require('./controllers/MainController')

//Google API Directive
var AutoCompleteDir = require('./directives/AutoCompleteDir')

var app = angular.module('app', [])
app.controller('MainController', ['$scope','$http', MainController])
app.directive('ngAutocomplete', [AutoCompleteDir]);


