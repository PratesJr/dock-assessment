import { Portador } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { PortadorDto } from 'src/types/portador.dto';
import { PortadorService } from './portador.interface';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class PortadorServiceImpl implements PortadorService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('PortadorRepository') private _portador: typeof Portador
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  ) { }
  findByDocument(query: FindOptions<any>): Promise<any> {

    return this._portador.findOne(query);
  }

  create(portador: PortadorDto): Promise<any> {
    if ((!cpf.isValid(portador.document) && !cnpj.isValid(portador.document))) {
      throw new BadRequestException('invalid document');
    }
    return this._portador.create({ ...portador });
  }

  delete(query: FindOptions<any>): Promise<any> {
    return this._portador.destroy(query);
  }
}
