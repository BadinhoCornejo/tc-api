import { errorHandler, NotFoundError } from '@softcodestudio/common';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import env from './config/environment';
import { healthCheckRoutes } from './health-check';
import { exchangeRateRoutes } from './exchange-rate/exchange-rate.routes';

const app = express();
app.use(cors());

app.use(express.json());

app.use(healthCheckRoutes);

app.use(exchangeRateRoutes);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(env.PORT, () => console.log(`Listening on ${env.PORT}`));
