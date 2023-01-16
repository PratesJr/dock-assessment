import { Conta } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { ContaService } from './conta.interface';
import * as random from 'randomstring';
import { ContaDto } from 'src/types/conta.dto';

@Injectable()
export class ContaServiceImpl implements ContaService {

  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('ContaRepository') private _conta: typeof Conta
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  ) { }

  create(data: ContaDto): Promise<any> {
    return this._conta.create({
      portadorId: data.portadorDocument,
      agencia: '00001',
      conta: random.generate({
        length: 6,
        charset: 'numeric'
      }),
      saldo: 0
    });
  }

  close(query: FindOptions): Promise<any> {
    return this._conta.destroy(query);
  }
  getInfo(query: FindOptions): Promise<any> {
    return this._conta.findOne(query);
  }
  withdraw(data: Conta, amount: number): Promise<any> {
    return data.update({
      saldo: data.saldo - amount
    }).then((conta: Conta) => {
      return conta.save();
    });

  }
  deposit(data: any, amount: number): Promise<any> {
    return data.update({
      saldo: data.saldo + amount
    }).then((conta: Conta) => {
      return conta.save();
    });
  }

  manageOperations(): Promise<any> {
    const operations: any = {
      withdraw: async (body: any) => {
        return this.withdraw(body, 0);
      },
      deposit: async (body: any) => {
        return this.deposit(body, 0);
      }
    };

    return operations;
  }
}
