import { NextFunction, Request, Response } from 'express';
import {IPipeline} from '../interfaces/pipeline.interface';
import PipelineService from '../services/pipelines.service';
import {CreatePipelineDto} from '../dtos/pipelines.dto';

class PipelinesController {
  public pipelineService = new PipelineService();

  public getPipelines = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pipelines: IPipeline[] = await this.pipelineService.findAll();
      res.status(200).json({ data: pipelines, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public findPipelineById = async (req: Request, res: Response, next: NextFunction) => {
    const pipelineId: string = req.params.id;

    try {
      const pipeline: IPipeline = await this.pipelineService.findById(pipelineId);
      res.status(200).json({ data: pipeline, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPipeline = async (req: Request, res: Response, next: NextFunction) => {
    const pipelineData: CreatePipelineDto = req.body;

    try {
      const createPipelineData: IPipeline = await this.pipelineService.create(pipelineData);
      res.status(201).json({ data: createPipelineData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePipeline = async (req: Request, res: Response, next: NextFunction) => {
    const pipelineId: string = req.params.id;
    const pipelineData: IPipeline = req.body;

    try {
      const updatePipelineData: IPipeline = await this.pipelineService.update(pipelineId, pipelineData);
      res.status(200).json({ data: updatePipelineData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePipeline = async (req: Request, res: Response, next: NextFunction) => {
    const pipelineId: string = req.params.id;

    try {
      const deletePipelineData: IPipeline = await this.pipelineService.deletePipeline(pipelineId);
      res.status(200).json({ data: deletePipelineData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PipelinesController;
