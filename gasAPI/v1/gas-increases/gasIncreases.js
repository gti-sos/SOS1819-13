const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@mangalper1-o8j8b.mongodb.net/mangalper1?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var gasIncreases;

client.connect(err => {
  gasIncreases = client.db("mangalper").collection("gasIncreases");
  console.log("Connected!");
  // perform actions on the collection object
});

module.exports = function(app, BASE_PATH){
    var path = "";
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
    
    // GET /gas-increases/docs/
    path = BASE_PATH + "/gas-increases/docs";
    app.get(path, (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/6914720/S17tRTs7");
    });
    
    
    //LOAD INITIAL DATA de GET /gas-increases
    path = BASE_PATH + "/gas-increases/loadInitialData";
    app.get(path, (req,res)=>{
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
    path = BASE_PATH + "/gas-increases";
    app.get(path, (req,res)=>{
        var year = req.query.year;
        var province = req.query.province;
        
        var limit = req.query.limit;
        var offset = req.query.offset;
        var from = req.query.from;
        
        if(year || province){
            if(!year) 
            { 
            
                gasIncreases.find({"province":province}).toArray((err, gasIncreasesArray)=>{ 
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(gasIncreasesArray);
            });
    
        }else if(!province){
            
            gasIncreases.find({"year":year}).toArray((err, gasIncreasesArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(gasIncreasesArray);
            });
        
        }
        else {
            
            gasIncreases.find({"year":year, "province":province}).toArray((err, gasIncreasesArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(gasIncreasesArray);
            });
        }
        
        }else if(limit){
        
        gasIncreases.find().limit(parseInt(limit,10)).skip(parseInt(offset,10)).toArray((err, gasIncreasesArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(gasIncreasesArray);
        });
        
    }else if(from){
        
        gasIncreases.find({ "year" : { $gte : from, $lte : req.query.to }}).toArray((err, gasIncreasesArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(gasIncreasesArray);
            });
    
    }else{
        
        gasIncreases.find({}).toArray((err, gasIncreasesArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(gasIncreasesArray);
        });
        
    }
});
        
        /*gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
            if(error)
                console.log("Error");
            res.send(gasIncreasesArray);
        });
        */
       
    
    // POST /gas-increases
    path = BASE_PATH + "/gas-increases";
    app.post(path, (req, res) => {
    var newGas = req.body;
    var coincide = false;
    var i = 0;
    
        if (newGas.year == null || newGas.province == null ||newGas.gasoleoAprice == null ||newGas.gasnormalprice == null ||newGas.gasoleoAplusprice == null){
            res.sendStatus(400);
        }else{
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
        }
        });
        
        path = BASE_PATH + "/gas-increases/:year/:province";
        app.post(path, (req,res)=>{
            res.sendStatus(405);
        });
        
    // DELETE /gas-increases
    path = BASE_PATH + "/gas-increases";
     app.delete(path, (req, res) => {
            
           gasIncreases.remove();
           res.sendStatus(200);
        
    });
    
    // GET /gas-increases/2017/sevilla
    path = BASE_PATH + "/gas-increases/:year/:province";
    app.get(path, (req, res) => {
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
            res.send(updatedgasIncreases[0]);
        }
        
        }); 
    });
    
    // PUT /gas-increases/2017/sevilla
    path = BASE_PATH + "/gas-increases/:year/:province";
    app.put(path, (req, res) => {
        var year = req.params.year;
        var province = req.params.province;
        var updatedData = req.body;
        var found = false;
        var coincide = true;
        var i = 0;
        var updatedgasIncreases = [];
        var aut = true;
        
        gasIncreases.find({}).toArray((error,gasIncreasesArray)=>{
                for(i=0;i<gasIncreasesArray.length;i++)
                    if (gasIncreasesArray[i].year==year && gasIncreasesArray[i].province==province){
                        if (gasIncreasesArray[i].year==updatedData.year && gasIncreasesArray[i].province==updatedData.province){
                            if(updatedData._id != null) {
                                if(gasIncreasesArray[i]._id != updatedData._id)
                                    aut = false;
                                    found = true;
                            } else {
                            found = true;
                            updatedgasIncreases.push(updatedData);
                            }    
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
        } else if (aut == false){
            res.sendStatus(401);
        }else{
            gasIncreases.remove();
            updatedgasIncreases.filter((d) =>{
                    gasIncreases.insert(d);
                });
                res.sendStatus(200);
        }
        });
    });
    
    path = BASE_PATH + "/gas-increases";
    app.put(path, (req, res) => {
        res.sendStatus(405);
    });
    
    
    // DELETE /gas-increases/2017/sevila
    path = BASE_PATH + "/gas-increases/:year/:province";
    app.delete(path, (req,res)=>{
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
}