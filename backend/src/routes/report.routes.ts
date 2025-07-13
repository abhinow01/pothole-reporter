//@ts-ignore
const { postReport, fetchReports } = require('../controllers/report.controller');
const express = require('express')
const router = express.Router();

router.post('/' , postReport);
router.get('/' , fetchReports);

module.exports =  router;