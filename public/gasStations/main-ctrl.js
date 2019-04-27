/*global angular*/

var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/gas-stations/";
    
    $scope.sendGet = function () {
        $http.get($scope.url).then(function (response) {
            $scope.dataResponse = JSON.stringify(response.data, null, 2);
            $scope.stateCode = response.status + ", " +  response.statusText;
            
        }, function (response) {
            $scope.stateCode = response.status + ", " + response.statusText;
            $scope.dataResponse = "[]";
        });
        
                
    };


$scope.sendPost = function (year,province,gasoleoAstations,gasoleoAplusstations,gasoleo98stations) {
        if (year != 'undefined' &&
            province != 'undefined' &&
            gasoleoAstations != 'undefined'&&
            gasoleoAplusstations != 'undefined' &&
            gasoleo98stations != 'undefined') {

            let data = {
                year: year,
                province: province,
                gasoleoAprice: gasoleoAstations,
                gasoleoAplusprice: gasoleoAplusstations,
                gasnormalprice: gasoleo98stations
            };
            console.log($scope.url);
            console.log(data);
            $http.post($scope.url, JSON.stringify(data)).then(function (response) {
                console.log("OK put method");
                $scope.dataResponse =  "";
                $scope.stateCode = response.status + ", " + response.statusText;
            }, function (response) {
                console.log("Error POST method: Code " + response.status + ", " + response.statusText);
                $scope.dataResponse = "";
                $scope.stateCode = response.status + ", " + response.statusText;
            });

        } else {
            $scope.dataResponse = "Fields required";
        }
    };


        
        
    $scope.sendPut = function(year,province,gasoleoAstations,gasoleoAplusstations,gasoleo98stations){
        var data = {
                year: year,
                province: province,
                gasoleoAprice: gasoleoAstations,
                gasoleoAplusprice: gasoleoAplusstations,
                gasnormalprice: gasoleo98stations
            };
        $http.put($scope.url, JSON.stringify(data)).then(function (response) {
            if(year != null &&
            province != null &&
            gasoleoAstations != null &&
            gasoleoAplusstations != null &&
            gasoleo98stations != null) {
            
            console.log("OK put method");
            $scope.dataResponse = JSON.stringify(response.data, null, 2);
            $scope.code = response.status;
            $scope.stateCode = response.status + ", " + response.statusText;
            }else{
            $scope.dataResponse="Fields required";
            $scope.stateCode = "";
        }
        }, function (response) {
            console.log("Error PUT method: Code " + response.status + ", " + response.statusText);
            $scope.dataResponse = "Introduzca correctamente los datos";
            $scope.stateCode = response.status + ", " + response.statusText;
        });

        
    };
    
    
    
     $scope.sendDelete = function () {
        $http.delete($scope.url).then(function (response) {
            console.log($scope.url);
            $scope.dataResponse = JSON.stringify(response.data, null, 2);
            $scope.stateCode = response.status + ", " + response.statusText;
        }, function (response) {
            $scope.stateCode = response.status + ", " + response.statusText;
        });
    };
}]);