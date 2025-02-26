import express from 'express';
import {query} from 'express-validator';
import { validateRequest } from '@softcodestudio/common';
import * as erService from "./exchange-rate.service"

const router = express.Router();
const BASE_PATH = '/api/v1/exchange-rate';

router.get(
  `${BASE_PATH}/usd-pen`,
  query('from').exists().isString().isLength({ min: 3 }),
  validateRequest,
  async (_req, res) => {
    try {
      const {from } = _req.query;
      const [response, error] = await erService.getExchangeRateUSDToPENSUNAT(from as string);

      if (error) throw error;

      return res.send(response);
    } catch (error) {
      throw error;
    }
  }
);

router.get(
  `${BASE_PATH}/usd-pen-bcr`,
  query('from').exists().isString().isLength({ min: 3 }),
  query('to').exists().isString().isLength({ min: 3 }),
  validateRequest,
  async (_req, res) => {
    try {
      const {from , to} = _req.query;
      const [response, error] = await erService.getExchangeRateUSDToPENBCR(from as string, to as string);

      if (error) throw error;

      return res.send(response);
    } catch (error) {
      throw error;
    }
  }
);


export { router as exchangeRateRoutes };
