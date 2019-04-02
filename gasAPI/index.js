var v1 = require("./v1");

module.exports = {
    gasIncreases : function(app, BASE_PATH){
        v1.gasIncreases(app, BASE_PATH+"/v1");
    },
    gasStations : function(app, BASE_PATH){
        v1.gasStations(app, BASE_PATH+"/v1");
    },
    provinceEmployments : function(app, BASE_PATH){
        v1.provinceEmployments(app, BASE_PATH+"/v1");
    }
}