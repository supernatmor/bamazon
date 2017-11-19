var mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"root",
	database:"bamazon_db"
})

connection.connect(function(err){
	if(err)return console.log(err);

	console.log("connected...");
})

connection.query("SELECT * FROM products", function(err, result){
	if(err)return console.log(err);

	console.log(result);
})