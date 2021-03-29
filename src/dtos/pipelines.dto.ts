import {IsIP, IsNumberString, IsString} from 'class-validator';

export class CreatePipelineDto{
  @IsNumberString()
  serialNumber:string
  @IsString()
  name: string;
  @IsIP()
  ipv4: string;
}
