import express from 'express';
import {
  getReports,
  getReportById,
  saveReport,
  deleteReport,
  getReview,
  saveReview,
} from '../controllers/reportController.js';
import { getAdminStats } from '../controllers/adminController.js';

const router = express.Router();

// Admin / Executive Aggregation
router.get('/admin/stats', getAdminStats);

// Report endpoints
router.get('/reports', getReports);
router.get('/reports/:id', getReportById);
router.post('/reports', saveReport);
router.put('/reports/:id', saveReport);
router.delete('/reports/:id', deleteReport);

// Council review endpoints
router.get('/reviews/:reportId', getReview);
router.post('/reviews/:reportId', saveReview);

export default router;
