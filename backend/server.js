import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/UserRoute.js';

// dotenv config
dotenv.config();

const app = express();

const { json } = bodyParser;

const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(json());

// Route
app.use('/api', router);

// Listener
app.listen(port, () => {
  console.log('server is running on port' + port);
});
