var express = require("express");
var gasAPI = require("./gasAPI");
var bodyParser = require("body-parser");
var path = require("path");



var app = express();

const BASE_PATH = "/api";

app.use(bodyParser.json());



//v1
gasAPI.gasIncreases(app, BASE_PATH);
gasAPI.gasStations(app, BASE_PATH);
/*gasAPI.provinceEmployments(app, BASE_PATH);*/



app.use("/", express.static(path.join(__dirname,"/public")));
app.use("/ui/v1/gas-increases", express.static(path.join(__dirname, "public/gas-increases")));
app.use("/ui/v1/gas-stations", express.static(path.join(__dirname, "public/gas-stations")));

var port = process.env.PORT || 8080;

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    console.log("Mangalper1 DB connected!");
    const uri_drp = "mongodb+srv://test:test@sos1819-drp-rwvk5.mongodb.net/test?retryWrites=true";
    const client_drp = new MongoClient(uri_drp, { useNewUrlParser: true });
    
    client_drp.connect(err => {
            console.log("Dieruioper DB connected!");
            app.listen(port, () => {
                console.log("Server ready on port " +port);
            });
    });
});

