/* eslint-disable no-unused-vars */
import { FindOptions } from 'sequelize';
import { PortadorDto } from 'src/types/portador.dto';

export interface PortadorService {
  create(portador: PortadorDto): Promise<any>
  findByDocument(query: FindOptions): Promise<any>
  delete(query: FindOptions): Promise<any>
}