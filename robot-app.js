const express = require('express');
const path = require('path');
// importing the data.js file
const mustacheExpress = require('mustache-express');
const app = express();
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/robotDB";
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));
//Listening on root

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log('Successfully connected to the database');
  }
  const data = require("./data");
  for (var i = 0; i < data.users.length; i++) {
    const user = data.users[i];
    db.collection("users").updateOne(
      {id: user.id},
      user,
      {upsert: true}
    )
  }
})


app.get('/', function (req, res) {
  // accessing the users inside the data.js file
  MongoClient.connect(url, function(err, db) {
    db.collection("users").find({}).toArray( function(err, documents){
      res.render("index", {
        users: documents
      })
    })
  })

})
app.get('/:id', function (req, res) {
  // accessing the users inside the data.js file
  var userid = parseInt(req.params.id)

  MongoClient.connect(url, function(err, db) {
    db.collection("users").find({id:userid}).toArray( function(err, documents){
      res.render("id", {
        users: documents
      })
    })
  })
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
})
