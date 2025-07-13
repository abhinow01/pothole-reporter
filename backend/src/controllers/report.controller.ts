const { createReport, getAllReports } = require('../services/report.service');

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// @ts-ignore
const postReport = async (req : any, res : any) => {
  try {
    console.log("==body==" , req.body)
    const report = await createReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    console.log("errpr" , error)
    res.status(500).json({ error: 'Failed to create report' });
  }
};

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
//@ts-ignore
const fetchReports = async (req : any, res : any) => {
  try {
    const reportData = await getAllReports();
    res.status(200).json(reportData);
  } catch (error) {
    res.status(404).json({ error: 'Reports not found!' });
  }
};

module.exports = {
  postReport,
  fetchReports,
};
