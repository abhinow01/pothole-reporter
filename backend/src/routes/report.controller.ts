import  { Router } from 'express';
import { postReport , fetchReports } from '../controllers/report.controller';

const router = Router()

router.post('/' , postReport);
router.get('/' , fetchReports);

export default router;