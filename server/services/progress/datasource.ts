import Base from '../../base'
import ILoggedIn from '../../interfaces/AuthInterface'
import __Company from "../../models/company";
import __Progress from "../../models/progress";
import {IProgressInput, ICompanyInput} from "./IProgress";
import {ForbiddenError, ValidationError} from "apollo-server-micro";
import mongoose, {ObjectId} from "mongoose";

class UserDataSource extends Base {
  async addCompany(data: ICompanyInput, user: ILoggedIn) {
    await this.isLoggedIn(user);
    await this.AddCompanyValidation(data)
    const checkIfExit = await __Company.findOne({name: data.name})
    if (checkIfExit) throw new ValidationError('Company already exist')
    await __Company.create({...data, userId: user._id})
    return "Company Added"
  }

  async getAllCompany({page = 1}: { page: number }, user: ILoggedIn) {
    await this.isLoggedIn(user)
    const options = {
      page: page,
      limit: 5,
      sort: {createdAt: -1},
      collation: {
        locale: 'en'
      }
    }
    return await (__Company as any).paginate({userId: user._id}, options)
  }

  async createProgressStep(data: IProgressInput, user: ILoggedIn) {
    await this.isLoggedIn(user);
    await this.AddStageAndStepsValidation(data)
    const steps = data.steps.map((name) => ({name}))
    const company = await __Company.findOne({userId: user._id, _id: data.companyId});
    if (!company) throw new ForbiddenError('Operation Forbidden')
    const checkIfExit = await __Progress.findOne({stage: data.stage, userId: user._id})
    if (checkIfExit) throw new ValidationError("Stage Already exist")
    const progress = await __Progress.create({...data, steps, userId: user._id});
    company.stages.push(progress._id)
    if (!company.activeStage) {
      company.activeStage = progress._id
    }
    await company.save();
    return "New Sage added successfully"
  }
  async getAllProgress(companyId: ObjectId, user: ILoggedIn) {
    await this.isLoggedIn(user)
    return __Progress.find({companyId, userId: user._id})
  }
  async checkCompletedStep({step, stage}: {step: ObjectId, stage: ObjectId }, user: ILoggedIn) {
    await this.isLoggedIn(user)
    const optionalQuery = {}
    const checkActiveStage = await __Company.findOne({ activeStage:stage, userId: user._id });
    if(!checkActiveStage) throw new ValidationError('Complete Active stage to get unlock next phase');
    const isLast = await __Progress.aggregate([[
      {
        '$match': {
          '_id': mongoose.Types.ObjectId(stage.toString()),
          'userId': mongoose.Types.ObjectId(user._id.toString())
        }
      }, {
        '$unwind': '$steps'
      }, {
        '$match': {
          'steps.status': 'pending'
        }
      }, {
        '$group': {
          '_id': '$_id',
          'steps': {
            '$sum': 1
          }
        }
      }
    ]])
    if(isLast[0].steps === 1) {
      (optionalQuery as any).isCompleted = true
      const removeCompletedFromList = checkActiveStage.stages.filter((c:ObjectId)=> c.toString() !== stage.toString())
      checkActiveStage.stages=removeCompletedFromList;
      checkActiveStage.activeStage = removeCompletedFromList[0];
      checkActiveStage.save();
    }
    await __Progress.updateOne({"steps._id": step},  { "$set": { "steps.$.status" : "completed", ...optionalQuery }})

    return "step updated successfully"
  }
}

export default UserDataSource
