import { FindOptions } from 'sequelize';

export interface PortadorService {
  create(portador: any): Promise<any>
  findByDocument(query: FindOptions): Promise<any>
  delete(query: FindOptions): Promise<any>
}