var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true })); 

nunjucks = require('nunjucks')
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

app.use(express.static('public' ));

var schedule = [
	{flight: 1212, origin: "SDF 7:00am", destination: "MIA 9:50am"},
	{flight: 4505, origin: "SDF 7:20am", destination: "LAS 8:30am"},
	{flight: 2212, origin: "SDF 10:00am", destination: "MIA 12:50pm"},
	{flight: 5505, origin: "SDF 11:20am", destination: "LAS 12:30pm"}
];

app.get('/reservation', function(req, res) {
	res.render('resform', {page_title: "reservation page", schedule: schedule});
});

app.get('/', function(req, res) {
	res.render('welcome', {page_title: 'welcome page'});
});

app.post('/handleform', function(req, res) {
	var reqBody = req.body;
	console.log(reqBody);
	
	var fullname = req.body.fullname;
	var flight = req.body.flight;
	var seating = req.body.seating;
	var meal = req.body.meal;
	
	reservation_summary = {page_title: "summary", fullname: fullname, flight:flight, seating: seating, meal: meal}
	res.render('summary', reservation_summary);
});

app.use(function (req, res) {
	res.status(404).send("Sorry, no such page found.")
});

app.listen(3000, function () {
	console.log('Flight App started on http://localhost:3000, press Ctrl C to end.');
});