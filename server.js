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
            'Add A New Department',
            'Add A New Role',
            'Add a New Employee',
            // 'Delete Employee',
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

                case 'Add A New Department':
                    addNewDept();
                    break;

                case 'Add A New Role':
                    addNewRole();
                    break;

                case 'Add a New Employee':
                    addNewEmp();
                    break;

                // case 'Delete Employee':
                //     deleteEmp();
                //     break;

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
        .then(([rows]) => {
            let data = rows;
            console.log('\n ');
            console.table(data);
            console.log('\n ');
            startTracker();
        })
}

function displayDepartment() {
    db.findDept()
        .then(([rows]) => {
            let data = rows;
            console.log('\n ');
            console.table(data);
            console.log('\n ');
            startTracker();
        })
}

function displayAllRoles() {
    db.findRole()
        .then(([rows]) => {
            let data = rows;
            console.log('\n ');
            console.table(data);
            console.log('\n ');
            startTracker();
        })
}

async function updateRole() {
    db.findAll().then(allEployees => {
        return allEployees
    })
        .then(employees => {
            db.findRole().then(allRoles => {
                return { employees, allRoles }
            }).then(employeeData => {
                console.log(employeeData.allRoles[0][0])
                // console.log(employeeData.employees [0])
                inquirer.prompt([{
                    type: 'list',
                    name: 'id',
                    message: 'Which employee?',
                    choices: employeeData.employees[0].map(employee => ({ name: employee.first_name, value: employee.id }))
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Employee id?',
                    choices: employeeData.allRoles[0].map(role => ({ name: role.Role, value: role.Id }))
                }]).then(updateRole => {
                    // console.log(updateRole)
                    return db.updateRole(updateRole.role_id, updateRole.id)
                }).then(response => {
                    // console.log('done')
                    startTracker();
                })
            })
        })

}

function addNewDept() {
    let newDept = inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'What is the name of the new department?'
    }]).then(answer => {
        const newDept = [answer.name];
        console.log(newDept);
        db.addDept(newDept);
        startTracker();
    })
};

function addNewRole() {
    let newRole = inquirer.prompt([{
        name: 'title',
        type: 'input',
        message: 'What is the title of your new role?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the salary?'
    },
    {
        name: 'department_id',
        type: 'input',
        message: 'What is the department id?'
    }

    ]).then(answer => {
        const newRole = [answer.title, answer.salary, answer.department_id];
        console.log(newRole);
        db.addRole(newRole);
        startTracker();
    })
}


function addNewEmp() {
    let newEmployee = inquirer.prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the Employees first name?'
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'What is the employees last name?'
    },
    {
        name: 'role',
        type: 'input',
        message: 'What will their role ID be?'
    },
    {
        name: 'manager',
        type: 'input',
        message: 'What is the manager id?'
    }]).then(answer => {
        const newEmployee = [answer.first_name, answer.last_name, answer.role, answer.manager];
        console.log(newEmployee);
        db.addEmployee(newEmployee);
        startTracker();
    })
}

// function deleteEmp() {
//     inquirer.prompt({
//         name: 'id',
//         type: 'input',
//         message: 'What is the ID of the emplyee you wish to remove?',
//     })
//     .then(answer => {
//         console.log(answer);
//         db.delete(answer);
//         console.log('Employee Removed!');
//         startTracker();
//     })
// }


function endTracker() {
    connection.end();
    console.log('Thanks for using Employee Tracker!');
}

startTracker();