const reportModel = require('../models/report.model');
const sendPotholeEmail = require('../utils/mailer')
/**
 * Create a new pothole report
 * @param {Object} data - Partial report data
 * @returns {Promise<Object>}
 */
function findAuthorityEmail(address:string): string {
if(address.includes('Delhi')) return 'kabhinav99@gmail.com';
if (address.includes('Bengaluru')) return 'bbmp.roads@karnataka.gov.in'
return process.env.DEFAULT_EMAIL || 'fallback@email.com';
}
const createReport = async (data : any) => {
  const report = new reportModel(data);
   console.log("REPORT" , report)
  const to = process.env.DEFAULT_EMAIL;
//   findAuthorityEmail(report.address || '');
  try{
    sendPotholeEmail({
    to , 
    // address:report.address , 
    description: report.description,
    lat:report.location.lat, 
    lng:report.location.lng, 
    imageUrl : report.imageUrl
})
}catch(error){
    console.log("failed to send email:",error)
}
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
