var express = require('express');
var app = express();

nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');  


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))  

var Trip = require('./modules/Trip.js');


app.get('/showAll', function(req, res) {   
					  
	Trip.find( function(err, allTrips) {   
		if (err) {
		    res.render('resultpage', {result : err});   
		}
		else {
		    if (allTrips.length == 0) {  
			   res.render('resultpage', {result : 'No Trip Data.'});  
		    }
		    else {
				console.log(allTrips[0])   
			   	res.render('showAll', { trips: allTrips });  
		    }
		}
	});
    
});

app.use('/addTripData', function(req, res){  
  
	if(req.method == "GET") {
		res.render('addTrip', {title: 'add trip'});
	}
	else if(req.method == "POST") {
		city = req.body.city
		
	    var newTrip = new Trip({      
	        date: req.body.date,            
		    driver: req.body.name,
			miles: req.body.miles,
			gallons: req.body.gallons,
			city: city
	    });

	    newTrip.save( function(err) {     
		    if (err) {
		    	res.render('resultpage', {result : 'Error ' + err});  
		    }
		    else {
		        res.render('resultpage', {title: 'add Trip', result : 'new Trip added'});   
		    }
	    }); 
	
	}
	
});


app.use('/getByCity', function(req, res) {   
    if(req.method == "GET") {
		res.render('getCity', {title: 'city trip list'});
	}
	else if(req.method == "POST") {
		
		var city = req.body.city;
	    
		Trip.find( {city: city}, function(err, allByCity) {  
			if (err) {
				res.render('resultpage', {result : err});   
			}
			else {
				if (allByCity.length == 0) {    
					res.render('resultpage', {result : 'No trips with that city.'});   
				}
				else {
					res.render('showAll', { trips: allByCity });  
				}
			}
		});
	
	}
    
});


app.use('/updateTrip', function(req, res) {   
	
	if(req.method == "GET") {
		res.render('update_trip', {title: 'update trip'});
	}
	else {   
		var miles = req.body.miles;
		var gallons = req.body.gallons;
		
	
		Trip.findOne( {miles: miles}, function(err, aTrip) {  
			if (err) {
				res.render('resultpage', {result : err});   
			}
			else if (!aTrip) {
				res.render('resultpage', {result : 'No trip in that city.'});   
			}
			else {
				aTrip.miles = newMiles;  
				aTrip.gallons = newGallons;
				
				aTrip.save(function (err) {    
					if(err) {
						res.render('resultpage', {result : err});   
					}
				});
				var msg = "Trip data updated for city: " + city;
				res.render('resultPage', { result : msg });
		   }
	  });  
	}
	  
});

					  

app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });
