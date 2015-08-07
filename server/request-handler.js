var showtimes = require('showtimes');
var q = require('q');
var appendTransitTime= require('./appendTransitTime');
var filter = require('./movieFilter');
var packer = require('./packer')


// function to enter lng & lat into showtimes parameter


// Need to see if longitude & latitude is one argument?
exports.getShows = function(req,res) {

  var s = showtimes(req.body.location, {pageLimit: 1});
  s.getTheaters(function(err, theaters) {
    // Should return an array of theaters
    console.log(theaters);
    appendTransitTime(req.body.location, theaters, function(results) {
      console.log(results);
      var filteredResults = filter(results);
      packer(filteredResults, function(movies) {
        res.status(200).send(movies);
      })

    });
  });
};
