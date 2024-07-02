// import pool from '../database.js';

// const createUserTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     age INT NOT NULL,
//     address JSON,
//     additionalInfo JSON
//   )
// `;

// async function createTable() {
//   try {
//     const [results] = await pool.query(createUserTableQuery);
//     console.log('Users table created successfully');
//   } catch (err) {
//     console.error('Error creating users table:', err.stack);
//   }
// }

// createTable().then(() => pool.end());
