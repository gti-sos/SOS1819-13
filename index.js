var express = require("express");
var gasAPI = require("./gasAPI");
var bodyParser = require("body-parser");

var app = express();

const BASE_PATH = "/api";

app.use(bodyParser.json());

gasAPI.gasIncreases(app, BASE_PATH);
/*gasAPI.provinceEmployments(app, BASE_PATH);*/

app.use("/", express.static(__dirname + "/public"));

var port = process.env.PORT || 8080;


app.listen(port, () => {
        console.log("Server ready on port " +port);
    });

const MongoClientDRP = require("mongodb").MongoClient;
const uriDRP = "mongodb+srv://test:test@sos1819-drp-rwvk5.mongodb.net/test?retryWrites=true";
const client = new MongoClientDRP(uriDRP, { useNewUrlParser: true });

var gasStations;

client.connect(err => {
  gasStations = client.db("sos1819-drp").collection("gasStations");
  console.log("Connected!");
  // perform actions on the collection object
    gasAPI.gasStations(app, BASE_PATH);
    app.use("/api/v1/gas-stations-minipostman", express.static(BASE_PATH.join(__dirname,"public/gas-stations")));
});

/*
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    const uri_drp = "mongodb+srv://test:test@sos1819-drp-rwvk5.mongodb.net/test?retryWrites=true";
    const client_drp = new MongoClient(uri_drp, { useNewUrlParser: true });
    
    client_drp.connect(err => {
        const uri_jma = "mongodb+srv://jmad:jmad@cluster0-oxc4d.mongodb.net/cluster0?retryWrites=true";
        const client_jma = new MongoClient(uri_jma, { useNewUrlParser: true });

        client_jma.connect(err => {
            console.log("Connected!");
            app.listen(port, () => {
                console.log("Server ready on port " +port);
            });
        });
    });
});
*/
