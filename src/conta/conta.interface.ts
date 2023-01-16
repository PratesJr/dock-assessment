/* eslint-disable no-unused-vars */
import { ContaDto } from '@app/types/dto';
import { FindOptions } from 'sequelize';


export interface ContaService {
  create(data: ContaDto): Promise<any>
  close(query: FindOptions): Promise<any>
  getInfo(query: FindOptions): Promise<any>
  deposit(data: any, amount: number): Promise<any>
  withdraw(data: any, amount: number): Promise<any>
  manageOperations(data: any): Promise<any>
}