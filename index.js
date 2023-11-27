var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

var Car = require('./modules/Car.js');
app.use(express.static('public'))

app.use('/showAll', function(req, res) {   
                                             
    Car.find( function(err, foundCars) {   
		 if (err) {
		     res.status(500).send(err);
		 }
		 else {
			 for(var i = 0; i < foundCars.length; i++) {
				 res.write("<p>" + foundCars[i].cid + " " + foundCars[i].year +  " " + foundCars[i].make + " " + foundCars[i].model + " " + foundCars[i].miles + " " + foundCars[i].price + " " + foundCars[i].dealer_id + "</p>");
			 }
			 res.end();  
		 }
    });
})

app.post('/addCar', function(req, res){ 
	var newCar = new Car ({               
		cid: req.body.carCid,
		year: req.body.carYear,
		make: req.body.carMake,
		model: req.body.carModel,
		miles: req.body.carMiles,
		price: req.body.carPrice,
		dealer_id: req.body.carDealer_id,
	});

	newCar.save( function(err) { 
		if (err) {
		    res.status(500).send(err);
		}
		else {
		    res.send("Car successfully added.");   
		}
   }); 
});

app.post('/findCar', function(req, res) { 
	
	var searchCid = req.body.carCid
	Car.findOne( {cid: searchCid}, function(err, foundCar) { 
		if (err) {
		    res.status(500).send(err);
		}
		else if (!foundCar) {
		    res.send('No car with the ID of ' + searchCid);
		}
		else {
			car = foundCar.cid + ", " + foundCar.year + ", " + foundCar.make + ", " + foundCar.model;
		    res.send(car);  
		}
	});
	
});



app.post('/updateCar', function(req, res) { 
	
	var updateCid = req.body.carCid;
    var updateMiles = req.body.carMiles;
    var updatePrice = req.body.carPrice;
    
    Car.findOne( {cid: updateCid}, function(err, car1) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!car1) {
		    res.send('No car with the ID of ' + updateCid);
		}
		else {
			car1.miles = updateMiles;
			car1.price = updatePrice;
		
			car1.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
            });
		    res.send("Update successful");
	   }
    });        

});


app.post('/deleteCar', function(req, res) {
	 var deleteCid = req.body.carCid;   
	 
	 Car.findOneAndRemove({cid: deleteCid}, function(err, car) { 
		if (err) {
		    res.status(500).send(err);
		}
		else if (!car) {
		    res.send('No car with the ID of ' + deleteCid);
		}
		else {
		    res.send("Car: " + deleteCid + " deleted."); 
		}
    });         
});





app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });
