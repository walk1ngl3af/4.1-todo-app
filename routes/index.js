var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let toDoItems = [
    {'id' : 1, 'description': 'wash dishes', 'completed': false},
    {'id' : 2, 'description': 'fold laundry', 'completed': true},
    {'id' : 3, 'description': 'do homework', 'completed': false},
  ]
  res.render('index', {toDoItems});
});