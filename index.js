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


var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + "/public"));

//API IVAN
var newGasIncreases = [{
    year: "2017",
    province: "sevilla",
    gasoleoAprice: "1.121",
    gasoleoAplusprice: "1.321",
    gasnormalprice: "1.223"
}, {
    year: "2017",
    province: "cadiz",
    gasoleoAprice: "1.218",
    gasoleoAplusprice: "1.420",
    gasnormalprice: "1.270"
}, {
    year: "2018",
    province: "sevilla",
    gasoleoAprice: "1.221",
    gasoleoAplusprice: "1.390",
    gasnormalprice: "1.275"
}, {
    year: "2018",
    province: "cadiz",
    gasoleoAprice: "1.220",
    gasoleoAplusprice: "1.410",
    gasnormalprice: "1.240"
}, {
    year: "2018",
    province: "madrid",
    gasoleoAprice: "1.201",
    gasoleoAplusprice: "1.401",
    gasnormalprice: "1.257"
}];


//API RES IVAN
//LOAD INITIAL DATA de GET /gasIncreases
app.get("/api/v1/gasIncreases/loadInitialData", (req,res)=>{
    gasIncreases.remove();
    newGasIncreases.filter((d) =>{
        gasIncreases.insert(d);
    });
        
    res.sendStatus(200);
});

// GET /gasIncreases
app.get("/api/v1/gasIncreases", (req,res)=>{
    
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
        if(error)
            console.log("Error");
        res.send(gasIncreasesArray);
    });
    
   
});

// POST /gasIncreases
app.post("/api/v1/gasIncreases", (req, res) => {
var newGas = req.body;
    gasIncreases.insert(newGas);
    res.sendStatus(201);
});

app.post("/api/v1/gasIncreases/:year/:province", (req,res)=>{
    res.sendStatus(405);
});

// DELETE /gasIncreases
app.delete("/api/v1/gasIncreases", (req, res) => {
    
   gasIncreases.remove();
   res.sendStatus(200);
    
    
});

// GET /gasIncreases/2017/sevilla
app.get("/api/v1/gasIncreases/:year/:province", (req, res) => {
    var year = req.params.year;
    var province = req.params.province;
    var i = 0;
    var updatedgasIncreases = [];
    
    
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
        for(i=0;i<gasIncreasesArray.length;i++)
            if(gasIncreasesArray[i].year==year && gasIncreasesArray[i].province==province)
                updatedgasIncreases.push(gasIncreasesArray[i]);
                
    
    
    if (updatedgasIncreases.length==0)
        res.sendStatus(404);
        
    else
        res.send(updatedgasIncreases);
    
    
    }); 
});

// PUT /gasIncreases/2017
app.put("/api/v1/gasIncreases/:year/:province", (req, res) => {
    var year = req.params.year;
    var province = req.params.province;
    var updatedData = req.body;
    var found = false;
    var i = 0;
    var updatedgasIncreases = [];
    
    gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
            for(i=0;i<gasIncreasesArray.length;i++)
                if (gasIncreasesArray[i].year==year && gasIncreasesArray[i].province==province){
                    found = true;
                    updatedgasIncreases.push(updatedData);
                } else {
                    updatedgasIncreases.push(gasIncreasesArray[i]);
                }
        
     
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

app.put("/api/v1/gasIncreases", (req, res) => {
    res.sendStatus(405);
});


// DELETE /gasIncreases/2017/sevila

app.delete("/api/v1/gasIncreases/:year/:province", (req,res)=>{
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


app.listen(port, () => {
    console.log("Server ready on port " +port);
});