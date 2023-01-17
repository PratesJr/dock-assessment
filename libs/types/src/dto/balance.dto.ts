import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString
} from 'class-validator';
import { OperationType } from '../enum/operation.enum';


export class ChangeBalanceDto {
  @IsNotEmpty()
  @IsEnum(OperationType)
  operation: OperationType;
  @IsNotEmpty()
  @IsNumberString()
  conta: string;
  @IsNotEmpty()
  @IsNumber()
  value: number;
}