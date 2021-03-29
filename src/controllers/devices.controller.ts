import { NextFunction, Request, Response } from 'express';
import {IDevice} from '../interfaces/device.interface';
import DeviceService from '../services/devices.service';
import {CreateDeviceDto} from '../dtos/devices.dto';

class DevicesController {
  public deviceService = new DeviceService();

  public getDevices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const devices: IDevice[] = await this.deviceService.findAll();
      res.status(200).json({ data: devices, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public findDeviceById = async (req: Request, res: Response, next: NextFunction) => {
    const deviceId: string = req.params.id;

    try {
      const device: IDevice = await this.deviceService.findById(deviceId);
      res.status(200).json({ data: device, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDevice = async (req: Request, res: Response, next: NextFunction) => {
    const deviceData: CreateDeviceDto = req.body;

    try {
      const createdeviceData: IDevice = await this.deviceService.create(deviceData);
      res.status(201).json({ data: createdeviceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
    const deviceId: string = req.params.id;

    try {
      const deleteDeviceData: IDevice = await this.deviceService.deleteDevice(deviceId);
      res.status(200).json({ data: deleteDeviceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DevicesController;
