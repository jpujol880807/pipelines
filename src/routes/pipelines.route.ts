import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import PipelinesController from '../controllers/pipelines.controller';
import {CreatePipelineDto} from '../dtos/pipelines.dto';

class PipelinesRoute implements Route {
  public path = '/pipelines';
  public router = Router();
  public pipelinesController = new PipelinesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.pipelinesController.getPipelines);
    this.router.get(`${this.path}/:id`, this.pipelinesController.findPipelineById);
    this.router.post(`${this.path}`, validationMiddleware(CreatePipelineDto, 'body'), this.pipelinesController.createPipeline);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreatePipelineDto, 'body', true), this.pipelinesController.createPipeline);
    this.router.delete(`${this.path}/:id`, this.pipelinesController.deletePipeline);
  }
}

export default PipelinesRoute;
