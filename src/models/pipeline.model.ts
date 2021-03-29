import { model, Schema, Document } from 'mongoose';
import {IPipeline} from '../interfaces/pipeline.interface';

const pipelineSchema: Schema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ipv4: {
    type: String,
    required: true,
  },
  devices: [{
    type: Schema.Types.Number,
    ref: 'Device'
  }]
});

const pipelineModel = model<IPipeline & Document>('Pipeline', pipelineSchema);

export default pipelineModel;
