var express = require('express');
var JSONData = require('./hero.json');
var fs = require("fs");
// get the client
const mysql = require('mysql2');

let Heros= {}
/*
Heros.getAll = function(){
    return JSONData
}
*/

/* 
Heros.saveNew = function(newHeroData){
    JSONData.push(newHeroData);
    fs.writeFile('./hero.json', JSONData, function(err) {
        if(err){
            console.log('ERR.')
        }   
    })
}*/


/*
//getall heros from the database asynchronously but  no output 
Heros.getAll = function(){
    // create the connection to database
	const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'heros',
	  password:'ccs#1234'
	});
	let query = 'select * from Comic where isValid = 1';
	connection.query(query,function(err,result,fields){
		// rows in results and columns in fields
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
		}
		else{
			console.log(result);
			console.log(fields);
			return result;
		}
	});
}
*/
// getAll function using promise. Sequntial execution of the function using promise 
Heros.getAll = function(){
	return new Promise(function(resolve,reject){
    // create the connection to database
	const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'heros',
	  password:'ccs#1234'
	});
	let query = 'select * from Comic where isValid = 1';
	connection.query(query,function(err,result,fields){
		// rows in results and columns in fields
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});
});
}
Heros.saveNew = function(newHeroData){
   // create the connection to database
   return new Promise(function(resolve,reject){
   const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'heros',
	  password:'ccs#1234'
	});
	let query = `insert into Comic(superhero,publisher,alter_ego,first_appearance,characters,isValid,update_time) values('${newHeroData.superhero}','${newHeroData.publisher}','${newHeroData.alter_ego}','${newHeroData.first_appearance}','${newHeroData.characters}',1,'${new Date()}')`;	
	//console.log(query);
	connection.query(query,function(err,result,fields){
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});

   });
}

Heros.deletehero = function(deleteHeroData){
	return new Promise(function(resolve,reject){
		 const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'heros',
	  password:'ccs#1234'
	});

		 let query = `update Comic set isValid = 0 where id = ${deleteHeroData.id}`;
		 connection.query(query,function(err,result,fields){
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});

	});
}

Heros.viewhero = function(viewHeroData){
	return new Promise(function(resolve,reject){
		 const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'heros',
	  password:'ccs#1234'
	});

		
		 let query = `select * from Comic  where id = '${viewHeroData.id}'`;
		 connection.query(query,function(err,result,fields){
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});

	});
}
Heros.updatehero = function(updateHeroData){
	return new Promise(function(resolve,reject){
		 const connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'heros',
	  password:'ccs#1234'
	});
	 let query = `update Comic set superhero = '${updateHeroData.superhero}',publisher ='${updateHeroData.publisher}' ,alter_ego='${updateHeroData.alter_ego}' ,first_appearance = '${updateHeroData.first_appearance}',characters = '${updateHeroData.characters}',isValid = 1,update_time = '${new Date()}'  where id = ${updateHeroData.id}`;
		 console.log(query);
		 connection.query(query,function(err,result,fields){
		if(err){
			console.log(err);
			console.log('ERR: fetching data from database');
			reject();
		}
		else{
			resolve(result);
		}
	});

	});
}

module.exports = Heros;