import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ContaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  portadorDocument: string;

}