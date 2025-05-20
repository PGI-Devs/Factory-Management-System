import express, { json } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import materialRoutes from './src/routes/materialRoutes.js'

dotenv.config();
const app = express();


app.use(json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/inventory', materialRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
