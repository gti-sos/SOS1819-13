/*global angular*/

var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/gas-increases";
    
    $scope.sendGet = function () {
        $http.get($scope.url).then(function (response) {
            let res = JSON.stringify(response.data, null, 2);
            if (response.data.length === 0) {

            }
            $scope.dataResponse = res;
            $scope.code = response.status;
        }, function (response) {
            $scope.dataResponse = response.status + ", " + response.statusText
        });
    };


$scope.sendPost = function (year, province, gasoleoAprice, gasoleoAplusprice, gasnormalprice) {
        if (year != 'undefined' &&
            province != 'undefined' &&
            gasoleoAprice != 'undefined'&&
            gasoleoAplusprice != 'undefined' &&
            gasnormalprice != 'undefined') {

            let data = {
                year: year,
                province: province,
                gasoleoAprice: gasoleoAprice,
                gasoleoAplusprice: gasoleoAplusprice,
                gasnormalprice: gasnormalprice
            };
            console.log($scope.url);
            console.log(data);
            $http.post($scope.url, JSON.stringify(data)).then(function (response) {
                console.log("OK put method");
                $scope.dataResponse =  JSON.stringify( response.statusCode + " : " + response.data, null, 2);
                $scope.code = response.status;
            }, function (response) {
                console.log("Error PUT method: Code " + response.status + ", " + response.statusText);
                $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
            });

        } else {
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
            console.log($scope.url);
        console.log(data);
        $http.put($scope.url, JSON.stringify(data)).then(function (response) {
            console.log("OK put method");
            $scope.dataResponse = JSON.stringify(response.data, null, 2);
            $scope.code = response.status;
        }, function (response) {
            console.log("Error PUT method: Code " + response.status + ", " + response.statusText);
            $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
        });

        }else{
            $scope.dataResponse="Fields required";
        }
    };
    
    
    
     $scope.sendDel = function () {
        $http.delete($scope.url).then(function (response) {
            console.log($scope.url);
            let res = JSON.stringify(response.data, null, 2);
            $scope.dataResponse = res;
            $scope.code = response.status;
        }, function (response) {
            $scope.dataResponse = response.status + ", " + response.statusText
        });
    };
}]);