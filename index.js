import express from 'express';
import cors from 'cors';
import db from './database.js';
import employeeRoutes from './controllers/userController.js';

const app = express();
app.use(cors());

app.use('/api/parse', employeeRoutes);

db.query('SELECT 1')
  .then(() => {
    console.log('db connection success');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => console.log('db connection failed:', err));

