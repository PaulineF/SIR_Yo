'use strict';

/**
 * @ngdoc function
 * @name sirApp.controller:PersonCtrl
 * @description
 * # PersonCtrl
 * Controller of the sirApp
 */
var sirApp = angular.module('sirApp')
  .controller('PersonCtrl', function ($scope, $log, $http, $location) {
      $scope.$log = $log;

          $http({
              url: '/rest/hello/persons',
              method: 'GET',
          }).then(function successCallback(response) {
              console.log(response)
              var data;
              if(response.data.person.firstName){
                  data = [];
                  data.push(response.data.person);
                  $scope.persons = data;
              }else{
                  $scope.persons = response.data.person;
              }
          });

          $scope.delete = function(id){
            $http({
                          url: '/rest/hello/persons/'+id,
                          method: 'DELETE'
                      }).then(function successCallback(response) {
                          $location.path('/person')
                      });
          }
  }).controller('PersonPost', function($scope, $log, $http, $location){
            $scope.user = {}

           $scope.submitForm = function(){
                  $http({
                      url: '/rest/hello/persons',
                      method: 'POST',
                      data: $scope.user
                  }).success(function(data){
                    if (!data.errors) {

                         $location.path('/person')
                      }
                  });
              }


  });
