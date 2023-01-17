import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PortadorDto {

  @IsNotEmpty()

  document: string;
  @IsNotEmpty()
  @IsNumberString()
  fullName: string;
}