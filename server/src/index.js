import express from 'express';
import { dbConfig } from './utils/config.js';
import inventoryRouter from './modules/inventory-management/routes/index.js';
import { sequelize } from './database/sequelize.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/inventory', inventoryRouter);
// TODO: mount other feature routers when ready

app.use(errorHandler);

await sequelize.authenticate();
await sequelize.sync();          // auto-creates tables in dev

app.listen(dbConfig.port, () =>
  console.log(`Server running on http://localhost:${dbConfig.port}`)
);

export default app;              // for tests
