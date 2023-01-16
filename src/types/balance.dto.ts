import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString
} from 'class-validator';
import { OperationType } from './operation.enum';

export class ChangeBalanceDto {
  @IsNotEmpty()
  @IsEnum(OperationType)
  operation: OperationType;
  @IsNotEmpty()
  @IsNumberString()
  document: string;
  @IsNotEmpty()
  @IsNumber()
  value: string;
}