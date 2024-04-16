var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/Database");
var db = mongoose.connection;

db.on("error", () => console.log("error in connecting to database"));
db.once("open", () => console.log("connection to Database"));

app.post("/save", (req, res) => {
  var ic = req.body.ic;
  var gender = req.body.gender;
  var postcode = req.body.postcode;
  var date_of_birth = req.body.date_of_birth;
  var town = req.body.town;

  var data = {
    ic: ic,
    gender: gender,
    postcoder: postcode,
    date_of_birth: date_of_birth,
    town: town,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record inserted succesfully");
  });
  return res.redirect("save_success.html");
});
app
  .get("/", (req, res) => {
    res.set({
      "Allow-aces-Allow-Origin": "*",
    });
    return res.redirect("save.html");
  })
  .listen(3000);

console.log("Listening on port 3000");
