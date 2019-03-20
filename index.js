var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + "/public"));



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

// API DIEGO
var gasStations = [{
    year: "2017",
    province: "sevilla",
    gasoleoAstations: "425",
    gasoleoAplusstations: "255",
    gasoleo98stations: "186"
}, {
    year: "2017",
    province: "cadiz",
    gasoleoAstations: "243",
    gasoleoAplusstations: "165",
    gasoleo98stations: "141"
}, {
    year: "2018",
    province: "sevilla",
    gasoleoAstations: "437",
    gasoleoAplusstations: "252",
    gasoleo98stations: "185"
}, {
    year: "2018",
    province: "cadiz",
    gasoleoAstations: "258",
    gasoleoAplusstations: "167",
    gasoleo98stations: "142"
}, {
    year: "2018",
    province: "madrid",
    gasoleoAstations: "710",
    gasoleoAplusstations: "586",
    gasoleo98stations: "510"
}];

// API JUANMA
var provinceEmployment = [{
    province: "cadiz",
    year: "2018",
    industryEmployment: 44250,
    buildingEmployment: 35575,
    servicesEmployment: 373400
}, {
    province: "madrid",
    year: "2018",
    industryEmployment: 267500,
    buildingEmployment: 195175,
    servicesEmployment: 2709675
}, {
    province: "sevilla",
    year: "2018",
    industryEmployment: 79950,
    buildingEmployment: 49325,
    servicesEmployment: 639775
}, {
    province: "cadiz",
    year: "2017",
    industryEmployment: 41975,
    buildingEmployment: 28075,
    servicesEmployment: 379400
}, {
    province: "madrid",
    year: "2017",
    industryEmployment: 268725,
    buildingEmployment: 166250,
    servicesEmployment: 2660950
}, {
    province: "sevilla",
    year: "2017",
    industryEmployment: 81450,
    buildingEmployment: 43525,
    servicesEmployment: 627850
}];

// API REST IVAN
// LOAD INITIAL DATA de GET /gasIncreases
app.get("/api/v1/gasIncreases/loadInitialData", (req, res) => {
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

    newGasIncreases.forEach((d) => {
        gasIncreases.push(d)
    })
    res.sendStatus(200);
});

// GET /gasIncreases
app.get("/api/v1/gasIncreases", (req, res) => {
    res.send(gasIncreases);
});

// POST /gasIncreases
app.post("/api/v1/gasIncreases", (req, res) => {

    var newData = req.body;
    gasIncreases.push(newData);
    res.sendStatus(201);
});

app.post("/api/v1/gasIncreases/:year/:province", (req,res)=>{
    res.sendStatus(405);
});

// DELETE /gasIncreases
app.delete("/api/v1/gasIncreases", (req, res) => {

    gasIncreases = [];

    res.sendStatus(200);
});

// GET /gasIncreases/2017
app.get("/api/v1/gasIncreases/:year/:province", (req, res) => {

    var year = req.params.year;
    var province = req.params.province;


    var filteredgasIncreases = gasIncreases.filter((d) =>{
       return d.year == year && d.province==province; 
    });
    
    if (filteredgasIncreases.length >= 1){
        res.send(filteredgasIncreases);
    } else {
        res.sendStatus(404);
    }

});


// PUT /gasIncreases/2017
app.put("/api/v1/gasIncreases/:year/:province", (req, res) => {

    var year = req.params.year;
    var province = req.params.province;
    var updatedData = req.body;
    var found = false;

    var updatedgasIncreases = gasIncreases.map((d) => {
        if (d.year == year && d.province == province) {
            found = true;
            return updatedData;
        } else {
            return d;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    } else {
        gasIncreases = updatedgasIncreases;
        res.sendStatus(200);
    }

});

app.put("/api/v1/gasIncreases", (req, res) => {
    res.sendStatus(405);
});

// DELETE /gasIncreases/2017

app.delete("/api/v1/gasIncreases/:province", (req,res)=>{


    var province = req.params.province;
    var found = false;


    var updatedgasIncreases = gasIncreases.filter((d) => {
        if (d.year == year)
            found = true;
        return d.province != province;

    });

    if (found == false) {
        res.sendStatus(404);
    } else {
        gasIncreases = updatedgasIncreases;
        res.sendStatus(200);
    }

});



// API REST DIEGO
// LOAD INITIAL DATA de GET /gasStations

app.get("/api/v1/gasStations/loadInitialData", (req,res)=>{
var newGasStations = [{		
    year: "2017",
    province: "sevilla",
    gasoleoAstations: "425",
    gasoleoAplusstations: "255",
    gasoleo98stations: "186"
}, {		
    year: "2017",		
    province: "cadiz",
    gasoleoAstations: "243",
    gasoleoAplusstations: "165",
    gasoleo98stations: "141"
}, {		
    year: "2018",		
    province: "sevilla",
    gasoleoAstations: "437",
    gasoleoAplusstations: "252",
    gasoleo98stations: "185"
}, {		
    year: "2018",		
    province: "cadiz",
    gasoleoAstations: "258",
    gasoleoAplusstations: "167",
    gasoleo98stations: "142"
}, {		
    year: "2018",
    province: "madrid",		
    gasoleoAstations: "710",
    gasoleoAplusstations: "586",
    gasoleo98stations: "510"
}];

    newGasStations.forEach( (d)=>{

        gasStations.push(d);
    });
    res.sendStatus(200);
});

// GET /gasStations
app.get("/api/v1/gasStations", (req, res) => {
    res.send(gasStations);
});

// POST /gasStations
app.post("/api/v1/gasStations", (req, res) => {

    var newData = req.body;
    gasStations.push(newData);
    res.sendStatus(201);
});


app.post("/api/v1/gasStations/:year/:province", (req,res)=>{
    res.sendStatus(405);
});

// DELETE /gasStations
app.delete("/api/v1/gasStations", (req, res) => {

    gasStations = [];

    res.sendStatus(200);
});

// GET /gasStations/2017
app.get("/api/v1/gasStations/:year/:province", (req, res) => {

    var year = req.params.year;
    var province = req.params.province;

    var filteredgasStations = gasStations.filter((d) => {
        return d.year == year && d.province == province;
    });

    if (filteredgasStations.length >= 1) {
        res.send(filteredgasStations);
    } else {
        res.sendStatus(404);
    }

});


// PUT /gasStations/2017
app.put("/api/v1/gasStations/:year/:province", (req, res) => {

    var year = req.params.year;
    var province = req.params.province;
    var updatedData = req.body;
    var found = false;

    var updatedgasStations = gasStations.map((d) => {
        if (d.year == year && d.province == province) {
            found = true;
            return updatedData;
        } else {
            return d;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    } else {
        gasStations = updatedgasStations;
        res.sendStatus(200);
    }

});

app.put("/api/v1/gasStations", (req, res) => {
    res.sendStatus(405);
});

// DELETE /gasStations/2017/sevilla
app.delete("/api/v1/gasStations/:province", (req,res)=>{

    var province = req.params.province;
    var found = false;

    var province = req.params.province;

    var updatedgasStations = gasStations.filter((d) => {
        if (d.year == year && d.province == province)
            found = true;
        return d.year != year && d.province != province;
    });

    if (found == false) {
        res.sendStatus(404);
    } else {
        gasStations = updatedgasStations;
        res.sendStatus(200);
    }
});


// API REST JUANMA
// LOAD INITIAL DATA de GET /provinceEmployment

app.get("/api/v1/provinceEmployment/loadInitialData", (req, res) => {
    var newProvinceEmployment = [{
        province: "cadiz",
        year: "2018",
        industryEmployment: 44250,
        buildingEmployment: 35575,
        servicesEmployment: 373400
    }, {
        province: "madrid",
        year: "2018",
        industryEmployment: 267500,
        buildingEmployment: 195175,
        servicesEmployment: 2709675
    }, {
        province: "sevilla",
        year: "2018",
        industryEmployment: 79950,
        buildingEmployment: 49325,
        servicesEmployment: 639775
    }, {
        province: "cadiz",
        year: "2017",
        industryEmployment: 41975,
        buildingEmployment: 28075,
        servicesEmployment: 379400
    }, {
        province: "madrid",
        year: "2017",
        industryEmployment: 268725,
        buildingEmployment: 166250,
        servicesEmployment: 2660950
    }, {
        province: "sevilla",
        year: "2017",
        industryEmployment: 81450,
        buildingEmployment: 43525,
        servicesEmployment: 627850
    }];

    newProvinceEmployment.forEach((d) => {
        provinceEmployment.push(d);
    });
    res.sendStatus(200);
});

// GET /provinceEmployment
app.get("/api/v1/provinceEmployment", (req, res) => {
    res.send(provinceEmployment);
});

// POST /provinceEmployment
app.post("/api/v1/provinceEmployment", (req, res) => {

    var newData = req.body;
    provinceEmployment.push(newData);
    res.sendStatus(201);
});

app.post("/api/v1/provinceEmployment/:year", (req, res) => {
    res.sendStatus(405);
});

// DELETE /provinceEmployment
app.delete("/api/v1/provinceEmployment", (req, res) => {

    provinceEmployment = [];

    res.sendStatus(200);
});

// GET /provinceEmployment/2017
app.get("/api/v1/provinceEmployment/:year", (req, res) => {

    var year = req.params.year;

    var filteredprovinceEmployment = provinceEmployment.filter((d) => {
        return d.year == year;
    });

    if (filteredprovinceEmployment.length >= 1) {
        res.send(filteredprovinceEmployment);
    } else {
        res.sendStatus(404);
    }

});


// PUT /provinceEmployment/2017/province
app.put("/api/v1/provinceEmployment/:year/:province", (req, res) => {

    var year = req.params.year;
    var province = req.params.province;
    var updatedData = req.body;
    var found = false;

    var updatedprovinceEmployment = provinceEmployment.map((d) => {
        if (d.year == year && d.province == province) {
            found = true;
            return updatedData;
        } else {
            return d;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    } else {
        provinceEmployment = updatedprovinceEmployment;
        res.sendStatus(200);
    }

});

app.put("/api/v1/provinceEmployment", (req, res) => {
    res.sendStatus(405);
});

// DELETE /provinceEmployment/2017
app.delete("/api/v1/provinceEmployment/:year", (req, res) => {

    var year = req.params.year;
    var found = false;

    var updatedprovinceEmployment = provinceEmployment.filter((d) => {
        if (d.year == year)
            found = true;
        return d.year != year;
    });

    if (found == false) {
        res.sendStatus(404);
    } else {
        provinceEmployment = updatedprovinceEmployment;
        res.sendStatus(200);
    }

});


app.listen(port, () => {
    console.log("Server ready on port " +port)
});
