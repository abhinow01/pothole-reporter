import reportModel from "../models/report.model";
import { Report } from "../models/report.model";
 
export const createReport = async (data : Partial<Report>) => {
    const report = new reportModel(data);
    return await report.save() 
}

export const getAllReports = async () => {
    return await reportModel.find().sort({ createdAt : -1 }); 
}
