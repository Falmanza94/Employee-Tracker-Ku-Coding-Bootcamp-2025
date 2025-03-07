"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const inquirer_1 = __importDefault(require("inquirer")); //Import Inquirer
const pg_1 = require("pg"); //Import PostgreSQL connection pool
dotenv_1.default.config();
//Creation of the pool of connections to the Postgre SQLDb
const pool = new pg_1.Pool({
    host: process.env.DB_Host,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
//Function to display the prompts for the user
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = yield inquirer_1.default.prompt({
        type: 'list',
        name: 'action',
        message: 'Welcome to the Museum Staff Database! How would you like to proceed?',
        choices: ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'End Application']
    });
    switch (action) {
        case 'View all departments':
            yield viewDepartments();
            break;
        case 'View all roles':
            yield viewRoles();
            break;
        case 'View all employees':
            yield viewEmployees();
            break;
        case 'Add a department':
            yield addDepartment();
            break;
        case 'Add a role':
            yield addRole();
            break;
        case 'Add an employee':
            yield addEmployee();
            break;
        case 'Update an employee role':
            yield updateEmployeeRole();
            break;
        case 'End Application':
            console.log('Ending...');
            process.exit();
    }
});
//Function for viewing all departments:
const viewDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield pool.query(`SELECT * FROM department`);
        console.table(res.rows);
    }
    catch (err) {
        console.error(`Error fetching departments:`, err);
    }
});
//Function for viewing all roles:
const viewRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield pool.query(`SELECT * FROM role`);
        console.table(res.rows);
    }
    catch (err) {
        console.error(`Error fetching roles:`, err);
    }
});
//Function for viewing all employees:
const viewEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield pool.query(`SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS deparment FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id`);
        console.table(res.rows);
    }
    catch (err) {
        console.error(`Error fetching employees:`, err);
    }
});
//Function for adding a department:
const addDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentName } = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the department name:',
        },
    ]);
    try {
        const res = yield pool.query(`INSERT INTO department (name) VALUES ($1) RETURNING *`, [departmentName]);
        console.log(`Added deparment: ${res.rows[0].name}`);
    }
    catch (err) {
        console.error(`Error adding department:`, err);
    }
});
//Function for adding a role:
const addRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const { title, salary, department_id } = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter a role tile:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:',
            validate: (input) => !isNaN(parseFloat(input)) || `Please enter a valid salary number.`,
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for this role:',
            validate: (input) => !isNaN(parseInt(input)) || `Please enter a valid department ID.`,
        },
    ]);
    try {
        const res = yield pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *`, [title, parseFloat(salary), parseInt(department_id)]);
        console.log(`Added role: ${res.rows[0].title}`);
    }
    catch (err) {
        console.error('Error adding role:', err);
    }
});
//Function for adding an employee:
const addEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, role_id, manager_id } = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for the employee:',
            validate: (input) => !isNaN(parseInt(input)) || 'Please enter a valid role ID.',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the employee (if applicable):',
            default: '',
        },
    ]);
    try {
        const res = yield pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *`, [first_name, last_name, parseInt(role_id), manager_id ? parseInt(manager_id) : null]);
        console.log(`Added employee: ${res.rows[0].first_name} ${res.rows[0].last_name}`);
    }
    catch (err) {
        console.error(`Error adding employee:`, err);
    }
});
//Function for updating an employee's role:
const updateEmployeeRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, newRoleId } = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the employee ID whose role you want to update:',
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID for the employee:',
        },
    ]);
    try {
        const res = yield pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [parseInt(newRoleId), parseInt(employeeId)]);
        if (res.rows.length > 0) {
            console.log(`Updated employee role: ${res.rows[0].first_name} ${res.rows[0].last_name}`);
        }
        else {
            console.log('Employee not found.');
        }
    }
    catch (err) {
        console.error('Error updating employee role:', err);
    }
});
//Start the application by calling this function:
startApp();
