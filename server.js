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

                case 'Add A New Department':
                    addDept();
                    break;
                    
                case 'Add A New Role':
                    addRole();
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

function addDept(){
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the new department?'
    }])
    .then(function(answer){
        // console.log(answer);
        db.query('INSERT INTO department SET ?',
        { name: answer.name },
        function(error, data){
            if (error) throw error
            console.table(data)
            menu()
        })
    })
};

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the departments id?'
        }
    ]).then(function(answers){
        console.log(answers);
        db.query('INSERT INTO role SET ?',{
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department_id
        },function(err, data) {
            if (err) throw err
            console.table(data)
            menu()            
        })
    })
};


function addNewEmp() {
    let name = inquirer.prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the Employees first name'
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'What is the employees last name'
    },
    {
        name: 'role',
        type: 'input',
        message: 'What will their role ID be?'
    },
    {
        name: 'manager',
        type: 'input',
        message: 'What is the manager?'
    }

    ])
        .then(answer => {
            const newEmployee = [answer.first_name, answer.last_name, answer.role, answer.manager];
            console.log(newEmployee);
            db.addEmployee(newEmployee);
            startTracker();
        })
}

function deleteEmp() {
    inquirer.prompt({
        name: 'id',
        type: 'input',
        message: 'What is the ID of the emplyee you wish to remove?',
    })
    .then(answer => {
        console.log(answer);
        db.delete(answer);
        console.log('Employee Removed!');
        startTracker();
    })
}


function endTracker() {
    connection.end();
    console.log('Thanks for using Employee Tracker!');
}

startTracker();