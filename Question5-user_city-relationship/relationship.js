const mongoose = require('mongoose');

//user-city is going to be one-to-many relationship model. One city can have multiple users, so city is parent and user is child

const citySchema = new mongoose.Schema({
  name: String,
  country: String,
});

//Parent referencing would be beneficial for large-scale applications where data relationships are complex and frequently changing. It also allows better query flexibility

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
});

const City = mongoose.model('City', citySchema);
const User = mongoose.model('User', userSchema);
