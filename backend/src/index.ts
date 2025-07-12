import  express  from "express";
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
// import connectToMongoose from './db/connection';
import connectToMongoose from "./db/connection";
import reportRoutes from './routes/report.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/reports', reportRoutes);

connectToMongoose().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});


