const reportModel = require('../models/report.model');

/**
 * Create a new pothole report
 * @param {Object} data - Partial report data
 * @returns {Promise<Object>}
 */
const createReport = async (data : any) => {
  const report = new reportModel(data);
  return await report.save();
};

/**
 * Get all reports, newest first
 * @returns {Promise<Array>}
 */
const getAllReports = async () => {
  return await reportModel.find().sort({ createdAt: -1 });
};

module.exports = {
  createReport,
  getAllReports,
};
