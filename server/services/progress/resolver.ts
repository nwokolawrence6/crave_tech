import type { NextApiRequest, NextApiResponse } from 'next'
import dataSource from '../../datasource'
import ILoggedIn from '../../interfaces/AuthInterface'
import ProgressDataSource from './datasource'
import {ICompanyInput, IProgressInput} from "./IProgress";
import {ObjectId} from "mongoose";

const ProgressMutation = {
  addCompany: async (root: any, { data }: { data: ICompanyInput }, { dataSources, req }: { dataSources: typeof dataSource, req: NextApiRequest & {user: ILoggedIn}, res: NextApiResponse }) => {
    const Company: typeof ProgressDataSource = dataSources.Progress;
    return await new Company().addCompany(data, req.user);
  },
  createProgressStep: async (root: any, { data }: { data: IProgressInput }, { dataSources, req }: { dataSources: typeof dataSource, req: NextApiRequest & {user: ILoggedIn}, res: NextApiResponse }) => {
    const Company: typeof ProgressDataSource = dataSources.Progress;
    return await new Company().createProgressStep(data, req.user);
  },
  checkCompletedStep: async (root: any, data : {step: ObjectId, stage: ObjectId }, { dataSources, req }: { dataSources: typeof dataSource, req: NextApiRequest & {user: ILoggedIn}, res: NextApiResponse }) => {
    const Company: typeof ProgressDataSource = dataSources.Progress;
    return await new Company().checkCompletedStep(data, req.user);
  }
}
const ProgressQuery = {
  getAllCompany: async (__: any, data: { page: number }, { dataSources, req }: { dataSources: typeof dataSource, req: NextApiRequest & { user:ILoggedIn }, res: NextApiResponse }) => {
    const Company: typeof ProgressDataSource = dataSources.Progress;
    return await new Company().getAllCompany(data, req.user);
  },
  getAllProgress: async (__: any, data: { companyId: ObjectId }, { dataSources, req }: { dataSources: typeof dataSource, req: NextApiRequest & { user:ILoggedIn }, res: NextApiResponse }) => {
    const Company: typeof ProgressDataSource = dataSources.Progress;
    return await new Company().getAllProgress(data.companyId, req.user);
  },
}



export { ProgressMutation, ProgressQuery }
