//@ts-ignore
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectToMongoose = require('./db/connection');
const reportRoutes = require('./routes/report.routes')
// const reportRoutes = require('./routes/report.routes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : "*"
}));
app.use(helmet());
app.use(express.json());
app.use((req : any, res:any, next:any) => {
  console.log('📡 Request:', req.method, req.url);
  next();
});

app.use('/reports', reportRoutes);

connectToMongoose().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});


