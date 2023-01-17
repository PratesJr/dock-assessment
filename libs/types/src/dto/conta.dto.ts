import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ContaDto {
  @IsNotEmpty()
  @IsNumberString()
  portadorDocument: string;

}