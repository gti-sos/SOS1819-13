var gasIncreases = require("./gas-increases/gasIncreases.js");

module.exports = {
    gasIncreases : function(app, BASE_PATH){
        gasIncreases(app, BASE_PATH);
    }
}