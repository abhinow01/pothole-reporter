import { Request , Response } from "express";
import { createReport , getAllReports } from "../services/report.service";

export const postReport = async (req: Request , res : Response) =>{
    try{
        const report = await createReport(req.body);
        res.status(201).json(report);
    }catch(error){
        res.status(500).json({ error: 'Failed to create report' });
    }
}

export const fetchReports = async (req : Request , res: Response) => {
    try{
        const reportData = await getAllReports();
        res.status(200).json(reportData).json({message : "report data"})
    }catch(error){
        res.status(404).json({error: "Reports not found! "})
    }
}