import {IsIn, IsString} from 'class-validator';

export class CreateDeviceDto{
  @IsString()
  vendor: string;
  @IsIn(['online', 'offline'])
  status: string;
  pipeline: string;
}
