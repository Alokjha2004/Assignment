import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import todoRoutes from './routes/todo.route.js';

import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is running")
});
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);



const startServer = async () => {
  try {
    await connectDB();  
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect DB", err);
    process.exit(1);
  }
};

startServer();