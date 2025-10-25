import express from 'express';
import { sendMessage, getStatus } from '../controller/controller.js';
const router = express.Router();
router.post('/', sendMessage);
router.get('/status', getStatus);
export default router;
