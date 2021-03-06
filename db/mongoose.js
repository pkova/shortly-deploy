var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var crypto = require('crypto');

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  this.code = shasum.digest('hex').slice(0, 5); 
  next();
});

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

var Link = mongoose.model('Link', linkSchema);
var User = mongoose.model('User', userSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

exports.Link = Link;
exports.User = User;

exports.db = db;