var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dbname');

var userSchema = mongoose.Schema(
  {
    username : String,
    email: String,
    number : Number,
    password : String,
  }
)

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user',userSchema);