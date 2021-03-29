import bcrypt from 'bcrypt';
import { CreatePipelineDto } from '../dtos/pipelines.dto';
import HttpException from '../exceptions/HttpException';
import { IPipeline} from '../interfaces/pipeline.interface';
import pipelineModel from '../models/pipeline.model';
import { isEmpty } from '../utils/util';

class PipelineService {
  public pipelines = pipelineModel;

  public async findAll(): Promise<IPipeline[]> {
    const pipelines: IPipeline[] = await this.pipelines.find();
    return pipelines;
  }

  public async findById(pipelineId: string): Promise<IPipeline> {
    const findPipeline: IPipeline = await this.pipelines.findOne({ _id: pipelineId }).populate('devices');
    if (!findPipeline) throw new HttpException(409, "This pipeline does not exist");

    return findPipeline;
  }

  public async create(pipelineData: CreatePipelineDto): Promise<IPipeline> {
    if (isEmpty(pipelineData)) throw new HttpException(400, "You need to send some data to create a new pipeline");

    const findPipeline: IPipeline = await this.pipelines.findOne({ serialNumber: pipelineData.serialNumber });
    if (findPipeline) throw new HttpException(409, `This serial number ${pipelineData.serialNumber} already exists`);

    const createPipelineData: IPipeline = await this.pipelines.create({...pipelineData, devices: []});
    return createPipelineData;
  }

  public async update(pipelineId: string, pipelineData: IPipeline): Promise<IPipeline> {
    if (isEmpty(pipelineData)) throw new HttpException(400, "You need to send data for update the pipeline.");

    const updatePipelineById: IPipeline = await this.pipelines.findByIdAndUpdate(pipelineId, { ...pipelineData }).populate('devices');
    if (!updatePipelineById) throw new HttpException(409, "This pipeline does not exist.");

    return updatePipelineById;
  }

  public async deletePipeline(pipelineId: string): Promise<IPipeline> {
    const deletePipelineById: IPipeline = await this.pipelines.findByIdAndDelete(pipelineId);
    if (!deletePipelineById) throw new HttpException(409, "Pipeline not found");

    return deletePipelineById;
  }
}

export default PipelineService;
