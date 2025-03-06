import dotenv from 'dotenv';
import inquirer from 'inquirer'; //Import Inquirer
import { Pool } from 'pg'; //Import PostgreSQL connection pool

dotenv.config();

//Creation of the pool of connections to the Postgre SQLDb
const pool = new Pool (
    {
        host: process.env.DB_Host,
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

//Function to view departments
const viewDepartments = async () => {
    const res = await pool.query(`SELECT id, name FROM department`);
    console.table(res.rows);
};

//Function to display the prompts for the user
const startApp = async () => {
    const menuOptions = [
      {
        type: 'list',
        name: 'action',
        message: 'Welcome to the Museum Staff Database! How would you like to proceed?',
        choices: 
            ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'End Application']
      }
    ];

const { action } = await inquirer.prompt(menuOptions);

switch (action) {
    case 'View all departments':
      await viewDepartments();
      break
    case 'View all roles':
      await viewRoles();
      break
    case 'View all employees':
      await viewEmployees();
      break
    case 'Add a department':
      await addDepartment();
      break
    case 'Add a role':
      await addRole();
      break
    case 'Add an employee':
      await addEmployee();
      break
    case 'Update an employee role':
      await updateEmployeeRole();
      break
    case 'End Application':
      console.log('Ending...');
      process.exit();
    }
};
