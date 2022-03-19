import {ICompany, IProgress} from "../../interfaces/databaseInterface/mongo";

export interface IProgressInput extends Omit<IProgress, "_id"&"createdAt"&"updatedAt">{
  companyId: string
}
export interface ICompanyInput extends Omit<ICompany, "_id"&"createdAt"&"updatedAt">{}
