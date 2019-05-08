/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("MainCtrl ready");

    $scope.url = "/api/v1/gas-increases";

    $scope.mensaje = "Ninguna acción realizada";

    function refresh() {

        $http.get($scope.url).then(function(response) {
            console.log("Datos recibidos " + JSON.stringify(response.data, null, 2));
            $scope.gasIncreases = response.data;

        });
    };

    $scope.cargaInicial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {

            $scope.mensaje = "Datos iniciales cargados";
            $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
        }, function(error) {
            $scope.mensaje = "La base de datos obtiene datos, bórrelos todos para cargarlos de nuevo";
            $scope.stateCode = error.status + ", " + error.statusText;
            refresh();
        });
    }
    
    $scope.addNewGas = function() {

        var newGas = $scope.newGasIncrease;
        console.log("añadiendo una nueva estadística " + JSON.stringify(newGas, null, 2));

        $http.post($scope.url, newGas).then(function(response) {
            console.log("Creado correctamente!");
            $scope.mensaje = " Dato añadido a la base de datos";
            $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
        }, function(error) {
            if (error.status == 409) {
                $scope.mensaje = "El recurso ya existe en la base de datos";
                $scope.stateCode = error.status + ", " + error.statusText;
                refresh();

            }
            else {
                $scope.mensaje = "Introduzca correctamente los datos";
                $scope.stateCode = error.status + ", " + error.statusText;
                refresh();
            }

        });
    };
    
    $scope.updategas = function () {
       var newGas = $scope.newGasUpdate;
       console.log("editando el recurso: "+ newGas.year +" , "+newGas.province);
       
       $http.put($scope.url + "/" + newGas.year + "/" + newGas.province, newGas).then(function(response){
           console.log("Editado correctamente!");
           $scope.mensaje = "El recurso ha sido editado correctamente";
           $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
       }, function(error) {
              $scope.mensaje = "Introduce correctamente el id del recurso";
              $scope.stateCode = error.status + ", " + error.statusText;
              refresh();
       });
    };
   
    $scope.deletegas = function(year, province) {

        $http.delete($scope.url+"/"+year+"/"+province).then(function(response) {
            console.log("Deleting field with province " + province + " and year " + year);
            $scope.stateCode = response.status + ", " + response.statusText;
            $scope.mensaje = "Recurso borrado";
            refresh();

        }, function(error) {
            $scope.stateCode = error.status + ", " + error.statusText;
            $scope.mensaje = "No se encuentra el recurso"
        });
    };

    $scope.deleteAllData = function() {

        $http.delete($scope.url).then(function(response) {

            $scope.mensaje = "Datos borrados";
            $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
        }, function(error) {
            $scope.stateCode = error.status + ", " + error.statusText;
            $scope.mensaje = "La base de datos está vacía";
        });
    };


    $scope.buscarDesdeHasta = function(from, to) {
        console.log("buscando...");
        $http({
            url: $scope.url,
            method: "GET",
            params: { from: $scope.from, to: $scope.to }
        }).then(function(response) {
            $scope.gasIncreases = response.data;
            console.log("Búsqueda realizada " + JSON.stringify(response.data, null, 2));
            $scope.mensaje = "Búsqueda realizada de "+from+" a "+to;
            $scope.stateCode = response.status + ", " + response.statusText;
        });

    };

    $scope.buscarRecurso = function(year) {
        console.log("Buscando ... ");
        $http.get($scope.url+"/"+year).then(function(response) {
            $scope.gasIncreases = response.data;
            console.log("Búsqueda realizada" + JSON.stringify(response.data, null, 2));
            $scope.gasIncreases = response.data;
            $scope.mensaje = "Búsqueda realizada con éxito";
            $scope.stateCode = response.status + ", " + response.statusText;
        }, function(error) {
            refresh();
            $scope.stateCode = error.status + ", " + error.statusText;
            $scope.mensaje = "No existen recursos con el año: "+year;
        });
        
    };
    
    

    refresh();
}]);

