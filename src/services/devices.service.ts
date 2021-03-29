import HttpException from '../exceptions/HttpException';
import deviceModel from '../models/device.model';
import { isEmpty } from '../utils/util';
import {IDevice} from '../interfaces/device.interface';
import {CreateDeviceDto} from '../dtos/devices.dto';
import PipelineService from './pipelines.service';
import pipelineModel from '../models/pipeline.model';

class DeviceService {
  public devices = deviceModel;
  public pipelineService = new PipelineService();
  public pipelineModel = pipelineModel

  public async findAll(): Promise<IDevice[]> {
    const devices: IDevice[] = await this.devices.find();
    return devices;
  }

  public async findById(deviceID: string): Promise<IDevice> {
    const findDevice: IDevice = await this.devices.findOne({ _id: deviceID });
    if (!findDevice) throw new HttpException(409, "This device does not exist");

    return findDevice;
  }

  public async create(deviceData: CreateDeviceDto): Promise<IDevice> {
    const pipelineData = await this.pipelineModel.findById(deviceData.pipeline);
    if (isEmpty(pipelineData)) throw new HttpException(400, "Not found pipeline for this device");
    const numberOfDevices = pipelineData.devices.length;
    if (numberOfDevices >= 10) {
      throw new HttpException(400, "This pipeline doesn't allow more than 10 devices");
    }

    const createDeviceData: IDevice = await this.devices.create(deviceData);
    pipelineData.devices.push(createDeviceData);
    await pipelineData.save();
    return createDeviceData;
  }

  public async deleteDevice(deviceId: string): Promise<IDevice> {
    const deleteDeviceById: IDevice = await this.devices.findByIdAndDelete(deviceId);
    if (!deleteDeviceById) throw new HttpException(409, "Device not found");

    return deleteDeviceById;
  }
}

export default DeviceService;
