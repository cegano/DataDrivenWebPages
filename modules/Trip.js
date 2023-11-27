var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/travel');
  

var tripSchema = new mongoose.Schema({
	date: {type: String, required: true, unique: true},
	driver: {type: String, required: true},
	miles: {type: Number, required: true},
	gallons: {type: Number, required: true},
	city: {type: String, required: true}
});

tripSchema.virtual('mpg').get(function() {  
    if(this.miles < 0 && this.gallons < 0)
	    return "-";
	else {
		mpg= (this.miles / this.gallons).toFixed(1)
		return parseFloat(mpg);
	}
});
	
module.exports = mongoose.model('Trip', tripSchema);



