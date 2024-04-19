import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import Mongoose
import routes from './src/routes'; // Import routes

dotenv.config();

const app = express();

// Set up a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// Use routes
app.use(routes);

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Start the server once connected to the database
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
