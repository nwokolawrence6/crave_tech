import {model, models, Schema} from "mongoose";
import {ICompany} from "../interfaces/databaseInterface/mongo";
import mongoosePaginate from 'mongoose-paginate-v2'

const companySchema = new Schema<ICompany>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  stages:[Schema.Types.ObjectId],
  activeStage:Schema.Types.ObjectId,
  address: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})
companySchema.plugin(mongoosePaginate as any);
export default models.company || model<ICompany>('company', companySchema)
