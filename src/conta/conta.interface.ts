/* eslint-disable no-unused-vars */
import { Conta } from '@app/database';
import { ContaDto } from '@app/types/dto';
import { PortadorIdDto } from '@app/types/dto/portador-id.dto';
import { FindOptions } from 'sequelize';


export interface ContaService {
  create(data: ContaDto): Promise<any>
  close(query: FindOptions): Promise<any>
  getInfo(query: FindOptions): Promise<any>
  deposit(data: any, amount: number): Promise<any>
  withdraw(data: any, amount: number): Promise<any>
  block(id: PortadorIdDto): Promise<void>
  manageOperations(data: Conta, amount: number, operation: string): Promise<any>
}