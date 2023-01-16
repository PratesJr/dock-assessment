import { Conta } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { ContaService } from './conta.interface';

@Injectable()
export class ContaServiceImpl implements ContaService {

  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('ContaRepository') private _conta: typeof Conta
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  ) { }

  create(data: any): Promise<any> {
    return this._conta.create({ ...data });
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
