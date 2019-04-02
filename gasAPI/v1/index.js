var gasIncreases = require("./gas-increases/gasIncreases.js");
var gasStations = require("./gas-stations/gasStations.js");
var provinceEmployments = require("./province-employments/provinceEmployments.js");

module.exports = {
    gasIncreases : function(app, BASE_PATH){
        gasIncreases(app, BASE_PATH);
    },
    gasStations : function(app, BASE_PATH){
        gasStations(app, BASE_PATH);
    },
    provinceEmployments : function(app, BASE_PATH){
        provinceEmployments(app, BASE_PATH);
    }
}