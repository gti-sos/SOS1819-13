var express = require("express");
var gasAPI = require("./gasAPI");
var bodyParser = require("body-parser");

var app = express();

const BASE_PATH = "/api";

app.use(bodyParser.json());

gasAPI.gasIncreases(app, BASE_PATH);


var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server ready on port " +port);
});