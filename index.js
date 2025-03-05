import inquirer from "inquirer";
import { closeDb, connectionToDb } from "./connection.js";
import { debugPort, title } from "process";


var employee_tracker = async function () {
    const db = await connectionToDb();
    inquirer.prompt ([{
        type: 'list',
        name: 'prompt',
        message: 'Make a selection...',
        choices: ['View Department', 'View Role', 'View Employee', 'Add a Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        if (answers.prompt === 'View Department') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log('Viewing Department: ');
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View Role') {
            db.query(`SELECT * FROM role`, (err,result) => {
                if (err) throw err;
                console.log('Viewing Role: ');
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View Employee') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log('Viewing Employee: ');
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What will the name be of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    }else {
                         console.log('{Add A Department Please.');
                         return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                });
            });
        } else if (answers.prompt === 'Add A Role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Please provide name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Add A Role Please.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please provide the salary of the role.',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Add A Salary Please.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Which department does this role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i=0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i <result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                   }
                   db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        employee_tracker();
                   });
                })
            });
        } else if (answers.prompt === 'Add An Employee')
        
    });
};

















// employee_tracker{} -- uncomment at very end