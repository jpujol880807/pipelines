import {model, Schema, Document} from 'mongoose';
import {IDevice} from '../interfaces/device.interface';
import {AutoIncrementID} from '@typegoose/auto-increment';
import mongoose from 'mongoose';

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

deviceSchema.post("findOneAndDelete", async function (doc) {
  await mongoose.model('Pipeline').update(
    { devices : doc._id},
    { $pull: { devices: doc._id } },
    { multi: true })
    .exec();
});

const deviceModel = model<IDevice & Document>('Device', deviceSchema);

export default deviceModel;
