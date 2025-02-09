import mysql from "mysql2";

// // Create a connection to the database
// const connection = mysql.createConnection({
//     host: 'localhost',        // Host Name
//     user: 'root',            // Database Username
//     password: 'root',        // Database Password
//     database: 'testdb'        // Database Name
// });

// // Connecting to database
// connection.connect(function (err) {
//     if (err) {
//         console.log("Database connection failed");
//     }
//     else {
//         console.log("Database Connected successfully");
//     }
// })

// export default connection


import { Sequelize } from "sequelize";

const dbName='HMS';
const dbUser='root';
const dbPassword='root';

const sequelize=new Sequelize(dbName, dbUser, dbPassword,{
    host:'localhost',
    dialect:"mysql",
    logging:console.log
   
});

const dbConnect=()=>{
    sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))
}

const db={
    sequelize:sequelize,
    dbConnect:dbConnect,
    users:{},
    departments:{},
    doctors:{},
    patients:{},
}

export default db; 