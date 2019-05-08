const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@sos1819-drp-rwvk5.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var gasStations;

client.connect(err => {
  gasStations = client.db("sos1819-drp").collection("gasStations");
  // perform actions on the collection object
});

module.exports = function(app, BASE_PATH){
    var path = "";
    var newGasStations = [{
    "year": "2017",
    "province": "sevilla",
    "gasoleoAstations": "425",
    "gasoleoAplusstations": "255",
    "gasoleo98stations": "186"
}, {
    "year": "2017",
    "province": "cadiz",
    "gasoleoAstations": "243",
    "gasoleoAplusstations": "165",
    "gasoleo98stations": "141"
}, {
    "year": "2018",
    "province": "sevilla",
    "gasoleoAstations": "437",
    "gasoleoAplusstations": "252",
    "gasoleo98stations": "185"
}, {
    "year": "2018",
    "province": "cadiz",
    "gasoleoAstations": "258",
    "gasoleoAplusstations": "167",
    "gasoleo98stations": "142"
}, {
    "year": "2018",
    "province": "madrid",
    "gasoleoAstations": "710",
    "gasoleoAplusstations": "586",
    "gasoleo98stations": "510"
}];



    
    //API RES DIEGO
    
    // GET /gas-stations/docs/
    path = BASE_PATH + "/gas-stations/docs";
    app.get(path, (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/6925017/S17tRnta");
    });
    
    
    //LOAD INITIAL DATA de GET /gas-stations
    path = BASE_PATH + "/gas-stations/loadInitialData";
    app.get(path, (req,res)=>{
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
    path = BASE_PATH + "/gas-stations";
    app.get(path, (req,res)=>{
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
    
        var province = req.query.province;
        var year =req.query.year;
        var gasoleoAstations =req.query.gasoleoAstations;
        var gasoleoAplusstations = req.query.gasoleoAplusstations;
        var gasoleo98stations = req.query.gasoleo98stations;
        
         if (Number.isInteger(from) && Number.isInteger(to)) {
            gasStations.find({"year":{$gte:from,$lte:to}}).skip(offset).limit(limit).toArray((error, gasStationsArray) => {
                if(error)
                    console.log("Error");
                res.send(gasStationsArray.map((d)=>{
                    delete d._id;
                    return d;
                }));
            });
         } else if (Number.isInteger(limit) && Number.isInteger(offset)) {
            gasStations.find({}).skip(offset).limit(limit).toArray((error, gasStationsArray) => {
                if(error)
                    console.log("Error");
                res.send(gasStationsArray.map((d)=>{
                    delete d._id;
                    return d;
                }));
            });
         } else if (year) {
             gasStations.find({year:year}).skip(offset).limit(limit).toArray((error, gasStationsArray) => {
                if (error)
                    console.log("Error");
                res.send(gasStationsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else if (province) {
             gasStations.find({province:province}).skip(offset).limit(limit).toArray((error, gasStationsArray) => {
             if (error)
                    console.log("Error");
                res.send(gasStationsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });        
         } else if (gasoleoAstations){
             gasStations.find({gasoleoAstations:gasoleoAstations}).skip(offset).limit(limit).toArray((error, gasStationsArray) => {
                if (error)
                    console.log("Error");
                res.send(gasStationsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else if (gasoleoAplusstations){
             gasStations.find({gasoleoAplusstations:gasoleoAplusstations}).skip(offset).limit(limit).toArray((error, gasStationsArray) => {
                if (error)
                    console.log("Error");
                res.send(gasStationsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else if (gasoleo98stations){
             gasStations.find({gasoleo98stations:gasoleo98stations}).skip(offset).limit(limit).toArray((error, gasStationsArray) => {
                if (error)
                    console.log("Error");
                res.send(gasStationsArray.map((d) => {
                    delete d._id;
                    return d;
                }));
            });
         } else {
              gasStations.find({}).skip(offset).limit(limit).toArray((error,gasStationsArray)=>{
            if(error)
                console.log("Error");
            res.send(gasStationsArray.map((d)=>{
                delete d._id;
                return d;
            }));
        });
        }
         
    });
      
   
  
    
    // POST /gas-stations
    path = BASE_PATH + "/gas-stations";
    app.post(path, (req, res) => {
    var newGas = req.body;
    var coincide = false;
    var i = 0;
    
        if (newGas.year == null || newGas.province == null ||newGas.gasoleoAstations == null ||newGas.gasoleo98stations == null ||newGas.gasoleoAplusstations == null){
            res.sendStatus(400);
        }else{
            gasStations.find({}).toArray((error,gasStationsArray)=>{
                for(i=0;i<gasStationsArray.length;i++)
                    if (gasStationsArray[i].year==newGas.year && gasStationsArray[i].province==newGas.province && gasStationsArray[i].gasoleo98stations==newGas.gasoleo98stations && gasStationsArray[i].gasoleoAplusstations==newGas.gasoleoAplusstations && gasStationsArray[i].gasoleoAstations==newGas.gasoleoAstations)
                        coincide = true;
            
            
            if(coincide == true) {
                res.sendStatus(409);
            }else{ 
                gasStations.insert(newGas);
                res.sendStatus(201);
            } 
            });
        }
        });
        
        path = BASE_PATH + "/gas-stations/:year/:province";
        app.post(path, (req,res)=>{
            res.sendStatus(405);
        });
        
    // DELETE /gas-stations
    path = BASE_PATH + "/gas-stations";
     app.delete(path, (req, res) => {
            
           gasStations.remove();
           res.sendStatus(200);
        
    });
    
    // GET /gas-stations/2017/sevilla
    path = BASE_PATH + "/gas-stations/:year/:province";
    app.get(path, (req, res) => {
        var year = req.params.year;
        var province = req.params.province;
        
        var i = 0;
        var updatedgasStations = [];
        
        
        gasStations.find({year:year,province:province}).toArray((error,gasStationsArray)=>{
            for(i=0;i<gasStationsArray.length;i++)
                if(gasStationsArray[i].year==year && gasStationsArray[i].province==province)
                    updatedgasStations.push(gasStationsArray[i]);
                    
        
        
        if (updatedgasStations.length==0){
            res.sendStatus(404);
            
        }else{
            delete updatedgasStations[0]._id;
            res.send(updatedgasStations[0]);
        }
        
        }); 
    });
    
    // PUT /gas-stations/2017
    path = BASE_PATH + "/gas-stations/:year/:province";
    app.put(path, (req, res) => {
        var year = req.params.year;
        var province = req.params.province;
        var updatedData = req.body;
        var found = false;
        var coincide = true;
        var i = 0;
        var updatedgasStations = [];
        var aut = true;
        
        gasStations.find({}).toArray((error,gasStationsArray)=>{
                for(i=0;i<gasStationsArray.length;i++)
                    if (gasStationsArray[i].year==year && gasStationsArray[i].province==province){
                        if (gasStationsArray[i].year==updatedData.year && gasStationsArray[i].province==updatedData.province){
                            if(updatedData._id != null) {
                                if(gasStationsArray[i]._id != updatedData._id)
                                    aut = false;
                                    found = true;
                            } else {
                            found = true;
                            updatedgasStations.push(updatedData);
                            }    
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
        } else if (aut == false){
            res.sendStatus(401);
        }else{
            gasStations.remove();
            updatedgasStations.filter((d) =>{
                    gasStations.insert(d);
                });
                res.sendStatus(200);
        }
        });
    });
    
    path = BASE_PATH + "/gas-stations";
    app.put(path, (req, res) => {
        res.sendStatus(405);
    });
    
    
    // DELETE /gas-stations/2017/sevila
    path = BASE_PATH + "/gas-stations/:year/:province";
    app.delete(path, (req,res)=>{
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
}