/* eslint-disable no-unused-vars */
import { Movimentacao } from '@app/database';
import { RegisterOperationDto } from '@app/types/dto/register-operation.dto';

export interface MovimentacaoService {
  withdrawRules(contaId: string, amount: number): Promise<any>
  register(data: RegisterOperationDto): Promise<any>
  getRegisterByPeriod(contaId: string, period: number): Promise<Movimentacao[]>
}