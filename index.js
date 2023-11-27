var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())              
app.use(bodyParser.urlencoded({ extended: true }));

var Student = require('./modules/Student.js'); 

app.use(express.static('public')) 


app.use('/getStudents', function(req, res) {   
    filter = req.query.filter
	if(filter == 'all') {
		f = {} 
	}
	else {
		f = {major: filter}
	}
    Student.find( f, function(err, students) {   
		 if (err) {
		    res.status(500).send(err);
		 }
		 else {
			console.log(students[0])
			res.json(students);  
		 }
    });
})



app.post('/updateStudent', function(req, res) {   

    var update_sid = req.body.sid   
    var update_major = req.body.major
	var update_hrs_attempted = req.body.hrs_attempted
	var update_gpa_points = req.body.gpa_points


	console.log(update_sid, update_major, update_hrs_attempted, update_gpa_points)
    Student.findOne( {sid: update_sid}, function(err, student) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!student) {
		    res.send('No student with a sid of ' + update_sid);
			
		}
		else {
			student.major = update_major;
			student.hrs_attempted = update_hrs_attempted;
			student.gpa_points = update_gpa_points;
			
		
			student.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
            });
		    res.status( "Update successful" );
	   }
    });        

});


app.get('/deleteStudent', function(req, res) {  
	 var delete_sid = req.query.sid;
	 Student.findOneAndRemove({sid: delete_sid}, function(err, student) {  // 
		if (err) {
		    res.status(500).send(err);
		}
		else if (!student) {
		    res.send('No student with an SID of ' + delete_sid);
		}
		else {
		    res.send("Student SID: " + delete_sid + " deleted."); 
		}
    });         
});


app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });