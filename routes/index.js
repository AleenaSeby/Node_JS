var express = require('express');
var router = express.Router();
var Heros = require('../models/heros.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JUSTICE LEAGUE' });
});

/*  ----response in json format------
    ---------------------------------
router.get('/saveData', function(req, res, next) {
  console.log(req.query);
  res.send(req.query);
}); */

/*-----response in data format-----------
----------------------------------------
router.get('/saveData', function(req, res, next) {
  res.render('datas', { data: req.query});
});*/
/*
router.get('/saveData', function(req, res, next) {
	Heros.saveNew(req.query);
  res.render('heros', { data: req.query});
});
*/
/*router.get('/getAllHeros', function(req, res, next) {
  res.render('heros', { data: Heros.getAll()});
});*/

router.get('/saveData', function(req, res, next) {
	Heros.saveNew(req.query)
	.then(function(){
		res.redirect('/getAllHeros')
	})
    .catch(console.log('ERR:: In resolving the promise')) 
});

router.get('/getAllHeros', function(req, res, next) {
	Heros.getAll()
	.then(function(retVal){
		res.render('heros', { data: retVal});
	})
	.catch(console.log('ERR:: In resolving the promise')) 
});


router.get('/deleteHero', function(req, res, next) {
	Heros.deletehero(req.query)
	.then(function(){
		res.redirect('/getAllHeros')
	})
	 .catch(console.log('ERR:: In resolving the promise')) 
});

router.get('/viewHero', function(req, res, next) {
	Heros.viewhero(req.query)
	.then(function(retVal){
		res.render('HeroDetail', { data: retVal});
	})
	.catch(console.log('ERR:: In resolving the promise')) 
});

router.get('/updatehero', function(req, res, next) {  
  Heros.updatehero(req.query)
  .then(function(retVal){
		res.render('update', { data: retVal});
	})
    .catch(console.log('ERR:: In resolving the promise')) 
});
module.exports = router;
