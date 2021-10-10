const inquirer = require('inquirer');
const db = require('./db');
const connection = require('./db/connection');


const startTracker = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Please choose an action',
        choices: [
            'View All Employees',
            'View All Departments',
            'View All Roles',
            'Update Role',
            'Add A Department',
            'Add a New Employee',
            'Delete Employee',
            'Exit'
        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    displayAll();
                    break;

                case 'View All Departments':
                    displayDepartment();
                    break;

                case 'View All Roles':
                    displayAllRoles();
                    break;

                case 'Update Role':
                    updateRole();
                    break;

                case 'Add A Department':
                    addDept();
                    break;

                case 'Add a New Employee':
                    addNewEmp();
                    break;

                case 'Delete Employee':
                    deleteEmp();
                    break;

                case 'Exit':
                    endTracker();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
}

function displayAll() {
db.findAll()
}

function displayDepartment() {

}

function displayAllRoles() {

}

async function updateRole() {

}

function addDept() {

}

function addNewEmp() {

}

function deleteEmp() {

}


function endTracker() {
    connection.end();
    console.log('Thanks for using Employee Tracker!');
}