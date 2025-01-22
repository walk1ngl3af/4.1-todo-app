var express = require('express');
var router = express.Router();
const toDoController = require("../controllers/todo_controller.js")

/* GET home page. */
router.get('/', toDoController.homeRoute);

router.get('/add', toDoController.renderAddForm);

router.post('/add', toDoController.addNewItem);

router.get('/complete/:id', toDoController.markItemAsComplete);

router.get('/incomplete/:id', toDoController.markItemAsIncomplete);

router.get('/delete/:id', toDoController.deleteItem);

router.get('/edit/:id', async function(req, res) {
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require("sequelize");
  const results = await sequelize.query('select * from todo where id=:id', {
    type: QueryTypes.SELECT,
    replacements: {
      id: req.params.id
    }
  });
  const item = results[0];
  console.log(results);
  res.render('edit_todo', {item})
})
router.post('/edit', async function(req, res) {
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require("sequelize");
  await sequelize.query('update todo set description = :description where id=:id', {
    type: QueryTypes.UPDATE,
    replacements: {
      id: req.params.id,
      description: req.body.description
    }
  });
  res.redirect('/');
})
module.exports = router;