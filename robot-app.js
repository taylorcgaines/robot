const express = require('express');
const path = require('path');
// importing the data.js file
const data = require('./data.js')
const mustacheExpress = require('mustache-express');
const app = express();
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));
//Listening on root
app.get('/', function (req, res) {
  // accessing the users inside the data.js file

    res.render("index", {
      users: data.users
    })
})
app.get('/:id', function (req, res) {
  // accessing the users inside the data.js file
  var id = req.params.id
    res.render("id", {
      users: data.users[id]
    })
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
})
