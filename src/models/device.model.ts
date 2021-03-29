import {model, Schema, Document} from 'mongoose';
import {IDevice} from '../interfaces/device.interface';
import {AutoIncrementID} from '@typegoose/auto-increment';

const deviceSchema: Schema = new Schema({
  _id: Number,
  vendor: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  pipeline: {
    type: Schema.Types.ObjectId,
    ref: 'Pipeline',
    required: true
  }
}, {timestamps: { createdAt: true, updatedAt: false }});

deviceSchema.plugin(AutoIncrementID, {})

const deviceModel = model<IDevice & Document>('Device', deviceSchema);

export default deviceModel;
