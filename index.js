var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// API IVÁN
var gasIncreases = [{
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


    // API REST IVAN
// LOAD INITIAL DATA de GET /gasIncreases
app.get("/api/v1/gasIncreases/loadInitialData",(req,res) => {
    res.send(gasIncreases);
});


// GET /gasIncreases
app.get("/api/v1/gasIncreases", (req,res)=>{
   res.send(gasIncreases);
});

// POST /gasIncreases
app.post("/api/v1/gasIncreases", (req,res)=>{
    
    var newData = req.body;
    gasIncreases.push(newData);
    res.sendStatus(201);
});


// DELETE /gasIncreases
app.delete("/api/v1/gasIncreases", (req,res)=>{
    
    gasIncreases = [];
    
    res.sendStatus(200);
});

// GET /gasIncreases/2017
app.get("/api/v1/gasIncreases/:year", (req,res)=>{

    var year = req.params.year;

    var filteredgasIncreases = gasIncreases.filter((d) =>{
       return d.year == year; 
    })
    
    if (filteredgasIncreases.length >= 1){
        res.send(filteredgasIncreases);
    }else{
        res.sendStatus(404);
    }

});


// PUT /gasIncreases/2017
app.put("/api/v1/gasIncreases/:year", (req,res)=>{

    var year = req.params.year;
    var updatedData = req.body;
    var found = false;

    var updatedgasIncreases = gasIncreases.map((d) =>{
        if(d.year==year){
            found = true;
            return updatedData;
        }else{
            return d; 
        }
        
    });
    
    if (found==false){
        res.sendStatus(404);
    } else {
        gasIncreases = updatedgasIncreases;
        res.sendStatus(200);
    }

});

// DELETE /gasIncreases/2017
app.delete("/api/v1/gasIncreases/:year", (req,res)=>{

    var year = req.params.year;
    var found = false;

    var updatedgasIncreases = gasIncreases.filter((d) =>{
        if(d.year==year)
            found = true;
        return d.year!=year;
    });
    
    if (found==false){
        res.sendStatus(404);
    } else {
        gasIncreases = updatedgasIncreases;
        res.sendStatus(200);
    }

});



app.listen(port, () => {
    console.log("Server ready on port " +port)
});