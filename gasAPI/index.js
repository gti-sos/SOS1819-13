var v1 = require("./v1")
var v2 = require("./v2");

module.exports = {
    gasIncreases : function(app, BASE_PATH){
        v1.gasIncreases(app, BASE_PATH+"/v1");
    },
    gasStations : function(app, BASE_PATH){
        v1.gasStations(app, BASE_PATH+"/v1");
    }, 
    gasIncreasesv2 : function(app, BASE_PATH){
        v2.gasIncreases(app, BASE_PATH+"/v2");
    },
    gasStationsv2 : function(app, BASE_PATH){
        v2.gasStations(app, BASE_PATH+"/v2");
    }/*,
    provinceEmployments : function(app, BASE_PATH){
        v1.provinceEmployments(app, BASE_PATH+"/v1");
    }
    */
}