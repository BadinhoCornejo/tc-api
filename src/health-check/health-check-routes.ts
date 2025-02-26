import express from "express";
import * as healthCheckService from "./health-check-service";

const router = express.Router();
const BASE_PATH = "/api/v1/health-check";

router.get(
  BASE_PATH,
  async (_req, res) => {
    try {
      const r = await healthCheckService.get();

      res.send(r)
    } catch (error) {
      throw error;
    }
  })

export { router as healthCheckRoutes };
