import { Router } from 'express';
import { getSummary } from './dashboard.controller';

const router = Router();

/**
 * @openapi
 * /api/dashboard/summary:
 *   get:
 *     tags: [Dashboard]
 *     summary: Aggregate dashboard stats (totals, by stage, by country, recent students)
 *     responses:
 *       200: { description: Dashboard summary }
 */
router.get('/summary', getSummary);

export default router;
