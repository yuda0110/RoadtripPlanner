var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    username: {
        type: String,
        required: true
      },
      email:{
        type: String,
        required: true
      },
      password:{
        type: String,
        required: true
      },
      trips:{
        type: Array,
        required: false
    }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;