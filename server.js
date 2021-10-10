const inquirer = require('inquirer');
const db = require('./db');
const connection = require('./db/connection');


const startTracker = () => {
inquirer.prompt({

})
}




function endTracker() {
    connection.end();
    console.log('Thanks for using Employee Tracker!');
}