var mysql = require("mysql");
var inquirer = require("inquirer");

var want;
var amount;
var orderTotal;

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function(err) {
    if (err) return console.log(err);

    console.log("connected...");
})


function queryServer() {

    connection.query("SELECT * FROM products", function(err, result) {
        if (err) return console.log(err);

        for (var i = 0; i < result.length; i++) {
            console.log("-----------------");
            console.log("ID: " + result[i].item_id);
            console.log("Item: " + result[i].product_name);
            console.log("Price: $" + result[i].price);

        }

        inquirer.prompt([{
                type: "input",
                name: "id",
                message: "What would you like to buy?"
            },
            {
                type: "input",
                name: "amount",
                message: "How many would you like?"
            }

        ]).then(function(cust) {
            want = parseInt(cust.id);
            amount = parseInt(cust.amount);

            if (result[want - 1].stock < amount) {
                console.log("Insufficient stock for that order...");

            } else {
            	orderTotal = result[want -1].price * amount;
            	console.log("Your total cost is: $" + orderTotal);
                var newStock = result[want -1].stock - amount;

                connection.query("UPDATE products SET ? WHERE ?", [{
                        stock: newStock
                    },
                    {
                        item_id: want
                    }
                ]);

                connection.end();

               	
            }
        });


    });
}

queryServer();