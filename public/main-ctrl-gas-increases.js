/*global angular*/

var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/gas-increases";

    $scope.sendGet = function(){
        $http.get($scope.url).then(function(response){
            var res = JSON.stringify(response.data,null,2);
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText;
            $scope.stateCode = response.status;
        });
    };
    $scope.sendPost = function(year, province, gasoleoAprice, gasoleoAplusprice, gasnormalprice) {
        if (year != 'undefined' &&
            province != 'undefined' &&
            gasoleoAprice != 'undefined'&&
            gasoleoAplusprice != 'undefined' &&
            gasnormalprice != 'undefined') {
            var data = {
                year: year,
                province: province,
                gasoleoAprice: gasoleoAprice,
                gasoleoAplusprice: gasoleoAplusprice,
                gasnormalprice: gasnormalprice
            };
            $http.post($scope.url, JSON.stringify(data)).then(function(response) {
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
                $scope.stateCode = response.status;
            }, function(response) {
                $scope.dataResponse = response.status + "\n" + response.statusText;
                $scope.stateCode = response.status;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    };
    $scope.sendPut = function(year, province, gasoleoAprice, gasoleoAplusprice, gasnormalprice){
        if(year != 'undefined' &&
            province != 'undefined' &&
            gasoleoAprice != 'undefined'&&
            gasoleoAplusprice != 'undefined' &&
            gasnormalprice != 'undefined') {
            var data = {
                year: year,
                province: province,
                gasoleoAprice: gasoleoAprice,
                gasoleoAplusprice: gasoleoAplusprice,
                gasnormalprice: gasnormalprice
            };
            $http.put($scope.url, JSON.stringify(data)).then(function (response) {
                $scope.dataResponse = JSON.stringify(response.data,null,2);
                $scope.stateCode = response.status;
            }, function (response) {
                $scope.dataResponse=response.status+"\n"+response.statusText;
                $scope.stateCode = response.status;
            });
        }else{
            $scope.dataResponse="Fields required";
        }
    };
    $scope.sendDelete = function(){
        $http.delete($scope.url).then(function(response){
            var res = JSON.stringify(response.data,null,2);
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText;
            $scope.stateCode = response.status;
        });
    };
}]);