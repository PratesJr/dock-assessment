import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString
} from 'class-validator';
import { OperationType } from '../enum/operation.enum';
import { ApiProperty } from '@nestjs/swagger';


export class ChangeBalanceDto {
  @IsNotEmpty()
  @IsEnum(OperationType)
  @ApiProperty({
    enum: ['deposit', 'withdraw'],
    description: 'use withdraw para saque e deposit para depositar'
  })
  operation: OperationType;
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'numero da conta'
  })
  conta: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'valor'
  })
  value: number;
}