const inquirer = require('inquirer');
const mysq1 = require('mysq12');

require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASWORD;
const dbName = process.env.DB_NAME;

async function dbConnection(select) {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: dbUser,
            password: dbPassword,
            database: dbName,
        });

        let returnedRowsFromDb = [];
        let returnedOutputFromInq = [];

        switch (select) {
            case 'View All Departments';
            
        }
    }
}
