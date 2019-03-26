var express = require("express");
var bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var gasIncreases;

client.connect(err => {
  gasIncreases = client.db("mangalper").collection("gasIncreases");
  console.log("Connected!");
  // perform actions on the collection object
});

const uri_drp = "mongodb+srv://test:test@sos1819-drp-rwvk5.mongodb.net/test?retryWrites=true";
const client_drp = new MongoClient(uri_drp, { useNewUrlParser: true });

var gasStations;

client_drp.connect(err => {
    
    gasStations = client_drp.db("sos1819-drp").collection("gasStations");
    console.log("Connected!");
});

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + "/public"));

//API IVAN
var newGasIncreases = [{
        "year": "2017",
        "province": "sevilla",
        "gasoleoAprice": "1.121",
        "gasoleoAplusprice": "1.321",
        "gasnormalprice": "1.223"
    },
    {
        "year": "2017",
        "province": "cadiz",
        "gasoleoAprice": "1.218",
        "gasoleoAplusprice": "1.420",
        "gasnormalprice": "1.270"
    },
    {
        "year": "2018",
        "province": "sevilla",
        "gasoleoAprice": "1.221",
        "gasoleoAplusprice": "1.390",
        "gasnormalprice": "1.275"
    },
    {
        "year": "2018",
        "province": "cadiz",
        "gasoleoAprice": "1.220",
        "gasoleoAplusprice": "1.410",
        "gasnormalprice": "1.240"
    },
    {
        "year": "2018",
        "province": "madrid",
        "gasoleoAprice": "1.201",
        "gasoleoAplusprice": "1.401",
        "gasnormalprice": "1.257"
    }];


//API RES IVAN

// GET /api/v1/gas-increases/docs/
app.get("/api/v1/gas-increases/docs", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/62723fe2c978d28c23fd");
    // https://www.getpostman.com/collections/62723fe2c978d28c23fd
});


//LOAD INITIAL DATA de GET /gas-increases
app.get("/api/v1/gas-increases/loadInitialData", (req,res)=>{
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
        if(gasIncreasesArray.length!=0){
            res.sendStatus(409);
        } else {
            gasIncreases.remove();
            newGasIncreases.filter((d) =>{
                gasIncreases.insert(d);
            });
            res.sendStatus(200);
        }
    });
});

// GET /gas-increases
app.get("/api/v1/gas-increases", (req,res)=>{
    
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
        if(error)
            console.log("Error");
        res.send(gasIncreasesArray);
    });
    
   
});

// POST /gas-increases
app.post("/api/v1/gas-increases", (req, res) => {
var newGas = req.body;
var coincide = false;
var i = 0;
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
        for(i=0;i<gasIncreasesArray.length;i++)
            if (gasIncreasesArray[i].year==newGas.year && gasIncreasesArray[i].province==newGas.province && gasIncreasesArray[i].gasnormalprice==newGas.gasnormalprice && gasIncreasesArray[i].gasoleoAplusprice==newGas.gasoleoAplusprice && gasIncreasesArray[i].gasoleoAprice==newGas.gasoleoAprice)
                coincide = true;
    
    
    if(coincide == true) {
        res.sendStatus(409);
    }else{ 
        gasIncreases.insert(newGas);
        res.sendStatus(201);
    } 
    });
});

app.post("/api/v1/gas-increases/:year/:province", (req,res)=>{
    res.sendStatus(405);
});

// DELETE /gas-increases
app.delete("/api/v1/gas-increases", (req, res) => {
    
   gasIncreases.remove();
   res.sendStatus(200);
    
    
});

// GET /gas-increases/2017/sevilla
app.get("/api/v1/gas-increases/:year/:province", (req, res) => {
    var year = req.params.year;
    var province = req.params.province;
    var i = 0;
    var updatedgasIncreases = [];
    
    
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
        for(i=0;i<gasIncreasesArray.length;i++)
            if(gasIncreasesArray[i].year==year && gasIncreasesArray[i].province==province)
                updatedgasIncreases.push(gasIncreasesArray[i]);
                
    
    
    if (updatedgasIncreases.length==0){
        res.sendStatus(404);
        
    }else{
        res.send(updatedgasIncreases);
    }
    
    }); 
});

// PUT /gas-increases/2017
app.put("/api/v1/gas-increases/:year/:province", (req, res) => {
    var year = req.params.year;
    var province = req.params.province;
    var updatedData = req.body;
    var found = false;
    var coincide = true;
    var i = 0;
    var updatedgasIncreases = [];
    
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
            for(i=0;i<gasIncreasesArray.length;i++)
                if (gasIncreasesArray[i].year==year && gasIncreasesArray[i].province==province){
                    if (gasIncreasesArray[i].year==updatedData.year && gasIncreasesArray[i].province==updatedData.province){
                        found = true;
                        updatedgasIncreases.push(updatedData);
                    }else{
                        coincide = false;
                    }
                } else {
                    updatedgasIncreases.push(gasIncreasesArray[i]);
                }
        
     if (coincide==false){
        res.sendStatus(400);
    }else if (found==false){
        res.sendStatus(404);
    }else{
        gasIncreases.remove();
        updatedgasIncreases.filter((d) =>{
                gasIncreases.insert(d);
            });
            res.sendStatus(200);
    }
    });
});

app.put("/api/v1/gas-increases", (req, res) => {
    res.sendStatus(405);
});


// DELETE /gas-increases/2017/sevila

app.delete("/api/v1/gas-increases/:year/:province", (req,res)=>{
    var year = req.params.year;
    var province = req.params.province;
    var found = false;
    var updatedgasIncreases = [];
    var i = 0;
    
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
        for(i=0;i<gasIncreasesArray.length;i++)
            if (gasIncreasesArray[i].year==year&&gasIncreasesArray[i].province==province)
                found = true;
                
            else
                updatedgasIncreases.push(gasIncreasesArray[i]);
        
        if (found==false)
            res.sendStatus(404);
        else
            gasIncreases.remove();
            updatedgasIncreases.filter((d) =>{
                gasIncreases.insert(d);
            });
            res.sendStatus(200);
    });
});

//API RES DIEGO

// GET /api/v1/gas-stations/docs/
app.get("/api/v1/gas-stations/docs", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/62723fe2c978d28c23fd");
    // https://www.getpostman.com/collections/62723fe2c978d28c23fd
});


//LOAD INITIAL DATA de GET /gas-stations
app.get("/api/v1/gas-stations/loadInitialData", (req,res)=>{
    gasStations.find({}).toArray((error,gasStationsArray)=>{
        if(gasStationsArray.length!=0){
            res.sendStatus(409);
        } else {
            gasStations.remove();
            newGasStations.filter((d) =>{
                gasStations.insert(d);
            });
            res.sendStatus(200);
        }
    });
});

// GET /gas-stations
app.get("/api/v1/gas-stations", (req,res)=>{
    
    gasStations.find({}).toArray((error,gasStationsArray)=>{
        if(error)
            console.log("Error");
        res.send(gasStationsArray);
    });
    
   
});

// POST /gas-stations
app.post("/api/v1/gas-stations", (req, res) => {
var newGas = req.body;
var coincide = false;
var i = 0;
    gasStations.find({}).toArray((error,gasStationsArray)=>{
        for(i=0;i<gasStationsArray.length;i++)
            if (gasStationsArray[i].year==newGas.year && gasStationsArray[i].province==newGas.province && gasStationsArray[i].gasnormalprice==newGas.gasnormalprice && gasStationsArray[i].gasoleoAplusprice==newGas.gasoleoAplusprice && gasStationsArray[i].gasoleoAprice==newGas.gasoleoAprice)
                coincide = true;
    
    
    if(coincide == true) {
        res.sendStatus(409);
    }else{ 
        gasStations.insert(newGas);
        res.sendStatus(201);
    } 
    });
});

app.post("/api/v1/gas-stations/:year/:province", (req,res)=>{
    res.sendStatus(405);
});

// DELETE /gas-stations
app.delete("/api/v1/gas-stations", (req, res) => {
    
   gasStations.remove();
   res.sendStatus(200);
    
    
});

// GET /gas-stations/2017/sevilla
app.get("/api/v1/gas-stations/:year/:province", (req, res) => {
    var year = req.params.year;
    var province = req.params.province;
    var i = 0;
    var updatedgasStations = [];
    
    
    gasStations.find({}).toArray((error,gasStationsArray)=>{
        for(i=0;i<gasStationsArray.length;i++)
            if(gasStationsArray[i].year==year && gasStationsArray[i].province==province)
                updatedgasStations.push(gasStationsArray[i]);
                
    
    
    if (updatedgasStations.length==0){
        res.sendStatus(404);
        
    }else{
        res.send(updatedgasStations);
    }
    
    }); 
});

// PUT /gas-stations/2017
app.put("/api/v1/gas-stations/:year/:province", (req, res) => {
    var year = req.params.year;
    var province = req.params.province;
    var updatedData = req.body;
    var found = false;
    var coincide = true;
    var i = 0;
    var updatedgasStations = [];
    
    gasStations.find({}).toArray((error,gasStationsArray)=>{
            for(i=0;i<gasStationsArray.length;i++)
                if (gasStationsArray[i].year==year && gasStationsArray[i].province==province){
                    if (gasStationsArray[i].year==updatedData.year && gasStationsArray[i].province==updatedData.province){
                        found = true;
                        updatedgasStations.push(updatedData);
                    }else{
                        coincide = false;
                    }
                } else {
                    updatedgasStations.push(gasStationsArray[i]);
                }
        
     if (coincide==false){
        res.sendStatus(400);
    }else if (found==false){
        res.sendStatus(404);
    }else{
        gasStations.remove();
        updatedgasStations.filter((d) =>{
                gasStations.insert(d);
            });
            res.sendStatus(200);
    }
    });
});

app.put("/api/v1/gas-stations", (req, res) => {
    res.sendStatus(405);
});


// DELETE /gas-stations/2017/sevila

app.delete("/api/v1/gas-stations/:year/:province", (req,res)=>{
    var year = req.params.year;
    var province = req.params.province;
    var found = false;
    var updatedgasStations = [];
    var i = 0;
    
    gasStations.find({}).toArray((error,gasStationsArray)=>{
        for(i=0;i<gasStationsArray.length;i++)
            if (gasStationsArray[i].year==year&&gasStationsArray[i].province==province)
                found = true;
                
            else
                updatedgasStations.push(gasStationsArray[i]);
        
        if (found==false)
            res.sendStatus(404);
        else
            gasStations.remove();
            updatedgasStations.filter((d) =>{
                gasStations.insert(d);
            });
            res.sendStatus(200);
    });
});



app.listen(port, () => {
    console.log("Server ready on port " +port);
});