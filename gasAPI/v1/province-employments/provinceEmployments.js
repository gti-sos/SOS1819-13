// API REST JUANMA (ENTREGABLE D01)

/*

*/


const MongoClient = require("mongodb").MongoClient;
const uri_jma = "mongodb+srv://jmad:jmad@cluster0-oxc4d.mongodb.net/cluster0?retryWrites=true";
const client_jma = new MongoClient(uri_jma, { useNewUrlParser: true });

var provinceEmployments;

client_jma.connect(err => {
    provinceEmployments = client_jma.db("sos1819-jma").collection("employments");
    console.log("Connected!");
});

module.exports = function(app, BASE_PATH){
    var path = "";
    var newProvinceEmployments = [{
        "province": "cadiz",
        "year": "2018",
        "industryEmployment": "44250",
        "buildingEmployment": "35575",
        "servicesEmployment": "373400"
    }, {
        "province": "madrid",
        "year": "2018",
        "industryEmployment": "267500",
        "buildingEmployment": "195175",
        "servicesEmployment": "2709675"
    }, {
        "province": "sevilla",
        "year": "2018",
        "industryEmployment": "79950",
        "buildingEmployment": "49325",
        "servicesEmployment": "639775"
    }, {
        "province": "madrid",
        "year": "2017",
        "industryEmployment": "268725",
        "buildingEmployment": "166250",
        "servicesEmployment": "2660950"
    }, {
        "province": "sevilla",
        "year": "2017",
        "industryEmployment": "81450",
        "buildingEmployment": "43525",
        "servicesEmployment": "627850"
    }];


    // GET /province-employments/docs/ -> Acceso a coleccion llamadas Postman sobre API
    
    path = BASE_PATH + "/province-employments/docs";
    app.get(path, (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/6911518/S1EH21Zi");
    
    // docs F04: https://documenter.getpostman.com/view/6911518/S17tS8bm
    });


    // GET province-employments/loadInitialData -> LOAD INITIAL DATA
    
    path = BASE_PATH + "/province-employments/loadInitialData";
    app.get(path, (req,res)=>{
        
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
        
            if(provinceEmploymentsArray.length!=0){
                res.sendStatus(409);
            } else {
                provinceEmployments.remove();
                newProvinceEmployments.filter((d) =>{
                    provinceEmployments.insert(d);
                });
                res.sendStatus(200);
            }
        });
    }); 
    
    
    // GET /province-employments
    
    path = BASE_PATH + "/province-employments";
    app.get(path, (req,res)=>{
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            if(error)
                console.log("Error");
            res.send(provinceEmploymentsArray.map((d)=>{
                delete d._id;
                return d;
            }));
        });
    
        
    });
   
   /*
        var province = req.query.province;
        var year = req.query.year;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var from = req.query.from;
        
        if(province || year){
            if(!year) 
            { 
                provinceEmployments.find({"province":province}).toArray((err, provinceEmploymentsArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                    
                res.send(provinceEmploymentsArray);
            });
    
        }else if(!province){
            
            provinceEmployments.find({"year":year}).toArray((err, provinceEmploymentsArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(provinceEmploymentsArray);
            });
        
        }
        else {
            
            provinceEmployments.find({"year":year, "province":province}).toArray((err, provinceEmploymentsArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(provinceEmploymentsArray);
            });
        }
        
        }else if(limit){
        
            provinceEmployments.find().limit(parseInt(limit,10)).skip(parseInt(offset,10)).toArray((err, provinceEmploymentsArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(provinceEmploymentsArray);
        });
        
        }else if(from){
        
            provinceEmployments.find({ "year" : { $gte : from, $lte : req.query.to }}).toArray((err, provinceEmploymentsArray)=>{
            if(err)
                console.log("Error: "+err);
                
            res.send(provinceEmploymentsArray);
        });
    
        }else{
        
            provinceEmployments.find({}).toArray((err, provinceEmploymentsArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(provinceEmploymentsArray);
            });
        }
   */
    
    
    // GET a un recurso -> /province-employments/province/year
    
    path = BASE_PATH + "/province-employments/:province/:year";
    app.get(path, (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var i = 0;
        var updatedprovinceEmployments = [];
    
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            for(i=0;i<provinceEmploymentsArray.length;i++)
                if(provinceEmploymentsArray[i].province==province && provinceEmploymentsArray[i].year==year)
                    updatedprovinceEmployments.push(provinceEmploymentsArray[i]);
                
        if (updatedprovinceEmployments.length==0){
            res.sendStatus(404);
        
        }else{
            delete updatedprovinceEmployments[0]._id;
            res.send(updatedprovinceEmployments[0]);
        }
        }); 
    });
  

    // POST /province-employments
    
    path = BASE_PATH + "/province-employments";
    app.post(path, (req, res) => {
        var newProvinceEmployments = req.body;
        var coincide = false;
        var i = 0;

        if (newProvinceEmployments.province == null || newProvinceEmployments.year == null || newProvinceEmployments.industryEmployment == null || newProvinceEmployments.buildingEmployment == null || newProvinceEmployments.servicesEmployment == null){
            res.sendStatus(400);
        }else{
            provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
                for(i=0;i<provinceEmploymentsArray.length;i++)
                    if (provinceEmploymentsArray[i].province==newProvinceEmployments.province && provinceEmploymentsArray[i].year==newProvinceEmployments.year)
                        coincide = true;
                
        if(coincide == true) {
            res.sendStatus(409);
        
        }else{ 
            provinceEmployments.insert(newProvinceEmployments);
            res.sendStatus(201);
        } 
        });
    }
    });
        
    
    // POST a un recurso -> /province-employments/province/year   -NO PERMITIDO-
          
    path = BASE_PATH + "/province-employments/:province/:year";
    app.post(path, (req,res)=>{
        res.sendStatus(405);
    });
        
    
    // PUT /province-employments   -NO PERMITIDO-
    
    path = BASE_PATH + "/province-employments";
    app.put(path, (req, res) => {
        res.sendStatus(405);
    });
    
    
    // PUT a un recurso -> /province-employments/province/year
    
    path = BASE_PATH + "/province-employments/:province/:year";
    app.put(path, (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var updatedData = req.body;
        var found = false;
        var coincide = true;
        var i = 0;
        var updatedprovinceEmployments = [];
        var aut = true;
        
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            for(i=0;i<provinceEmploymentsArray.length;i++)
                if (provinceEmploymentsArray[i].province==province && provinceEmploymentsArray[i].year==year){
                    if (provinceEmploymentsArray[i].province==updatedData.province && provinceEmploymentsArray[i].year==updatedData.year){
                        if(updatedData._id != null) {
                            if(provinceEmploymentsArray[i]._id != updatedData._id)
                                aut = false;
                                found = true;
                        } else {
                        found = true;
                        updatedprovinceEmployments.push(updatedData);
                        }    
                    }else{
                        coincide = false;
                    }
                } else {
                    updatedprovinceEmployments.push(provinceEmploymentsArray[i]);
                }
        
        if (coincide==false){
            res.sendStatus(400);
        }else if (found==false){
            res.sendStatus(404);
        } else if (aut == false){
            res.sendStatus(401);
        }else{
            provinceEmployments.remove();
            updatedprovinceEmployments.filter((d) =>{
                provinceEmployments.insert(d);
                });
            res.sendStatus(200);
        }
        });
    });
    
    
    // DELETE /province-employments
    
    path = BASE_PATH + "/province-employments";
     app.delete(path, (req, res) => {
            
           provinceEmployments.remove();
           res.sendStatus(200);
        
    });
    
    
    // DELETE a un recurso -> /province-employments/province/year
    
    path = BASE_PATH + "/province-employments/:province/:year";
    app.delete(path, (req,res)=>{
        var province = req.params.province;
        var year = req.params.year;
        var found = false;
        var updatedprovinceEmployments = [];
        var i = 0;
    
        provinceEmployments.find({}).toArray((error,provinceEmploymentsArray)=>{
            for(i=0;i<provinceEmploymentsArray.length;i++)
           
                if (provinceEmploymentsArray[i].province==province&&provinceEmploymentsArray[i].year==year)
                    found = true;
                else
                    updatedprovinceEmployments.push(provinceEmploymentsArray[i]);
        
            if (found==false)
                res.sendStatus(404);
            else
                provinceEmployments.remove();
                updatedprovinceEmployments.filter((d) =>{
                    provinceEmployments.insert(d);
                });
                res.sendStatus(200);
        });
    });
}