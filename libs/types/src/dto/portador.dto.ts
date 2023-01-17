import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PortadorDto {

  @ApiProperty({
    required: true,
    description: 'cpf ou cnpj'
  })
  @IsNotEmpty()
  document: string;
  @ApiProperty({
    required: true,
    description: 'nome completo'
  })
  @IsNotEmpty()
  @IsNumberString()
  fullName: string;
}