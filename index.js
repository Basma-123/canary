const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const handlebars = require('express-handlebars');
app.use(express.static('public'));
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canary",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

});

const hbs = handlebars.create({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');





app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index', {
    layout: "index"
  });
});

app.get('/signin', (req, res) => {

  res.render('signin', {
    layout: "index"
  });

});

app.get('/signup', (req, res) => {

  res.render('signup', {
    layout: "index"
  });

});


app.get('/profile/:username', (req, res) => {

  console.log(req.params.username);


  con.query("SELECT * FROM user where username=?", req.params.username, function (err, result, fields) {

    if (err) throw err;
    console.log(result);
    res.render('profile', {
      layout: 'index',
      Userinfo : result
    });

  });

});


app.listen(3000);