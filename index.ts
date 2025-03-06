import inquirer from "inquirer";
import { closeDb, connectToDb } from "./db/connection";
import { debugPort, title } from "process";


var employee_tracker = async function () {
    const db = await connectToDb();
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
                message: 'Please provide the name of the new department.',
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
                        message: 'Please provide the name of the role.',
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
                        message: 'Please provide which department this role belongs to.',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`);
                        employee_tracker();
                    });
                });
            });
        } else if (answers.prompt === 'Add An Employee') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
        
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Please provide employee first name.',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Add A First Name Please.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Please provide employee last name.',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Add A Last Name Please.');
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Please provide the employees role.',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [... new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Please provide who the employee manager is.',
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log('Add A Manager Please.');
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Change An Employee Role') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
                
                inquirer.prompt ([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employees role would you like to change?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set (array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var name = result[i];
                        }
                    }

                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`)
                        employee_tracker();
                    })
                })
            });
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log('Bye-Bye!');
        }
    })
};
















// employee_tracker{} -- uncomment at very end