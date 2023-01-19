// Student Name: Alfej Savaya
// Student ID: 118823210
// Student Email: aasavaya@myseneca.ca
// Date: 04-Nov-2022
// Lab No: 5

// require mongoose and setup the Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// connect to Your MongoDB Atlas Database
mongoose.connect("mongodb+srv://alfej:78678677@senecaweb.i0mgpaa.mongodb.net/?retryWrites=true&w=majority");

// define the person schema
var personSchema = new Schema({
  "First_Name": {
    type: String,
    unique: true
  },
  "Last_Name": String,
  "Age": {
    "type": Number,
    "default": 0
  }
});
var Person = mongoose.model("Person", personSchema);

// create a new person
var alfej = new Person({
  First_Name: "Alfej",
  Last_Name: "Savaya",
  Age: 20
});

// save the person
alfej.save().then(() => {
  console.log("The person was saved to the Person collection");
  Person.find({ First_Name: "Alfej" })
    .exec()
    .then((person) => {
      if (!person) {
        console.log("No person could be found");
      } else {
        console.log(person);
      }
    })
    .catch((err) => {
      console.log(`There was an error: ${err}`);
    });
}).catch(err => {
    console.log(`There was an error saving the person information: ${err}`);
});
