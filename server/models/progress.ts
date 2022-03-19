import {model, models, Schema} from "mongoose";
import {IProgress, ISteps} from "../interfaces/databaseInterface/mongo";
import mongoosePaginate from 'mongoose-paginate-v2'

const steps = new Schema<ISteps>({
  name: String,
  status: {type: String, default: 'pending', enum: ["pending", "completed"]},
}, {
  timestamps: true,
});

const progressSchema = new Schema<IProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  stage: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  isCompleted: false,
  steps: {
    type: [steps],
    required: true
  }
}, {
  timestamps: true
})
progressSchema.plugin(mongoosePaginate as any);
export default models.progress || model<IProgress>('progress', progressSchema)
