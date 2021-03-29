import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import DevicesController from '../controllers/devices.controller';
import {CreateDeviceDto} from '../dtos/devices.dto';

class DevicesRoute implements Route {
  public path = '/devices';
  public router = Router();
  public devicesController = new DevicesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.devicesController.getDevices);
    this.router.get(`${this.path}/:id`, this.devicesController.findDeviceById);
    this.router.post(`${this.path}`, validationMiddleware(CreateDeviceDto, 'body'), this.devicesController.createDevice);
    this.router.delete(`${this.path}/:id`, this.devicesController.deleteDevice);
  }
}

export default DevicesRoute;
