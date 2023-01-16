/* eslint-disable no-unused-vars */
import { PortadorDto } from '@app/types/dto';
import { FindOptions } from 'sequelize';


export interface PortadorService {
  create(portador: PortadorDto): Promise<any>
  findByDocument(query: FindOptions): Promise<any>
  delete(query: FindOptions): Promise<any>
}