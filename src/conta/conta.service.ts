import { Conta } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { ContaService } from './conta.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const random = require('randomstring');
import { ContaDto } from '@app/types/dto';


@Injectable()
export class ContaServiceImpl implements ContaService {

  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('ContaRepository') private _conta: typeof Conta
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  ) { }

  async create(data: ContaDto): Promise<any> {
    return this._conta.findOne({
      where: {
        portadorId: data.portadorDocument,
        // eslint-disable-next-line camelcase
        deleted_at: { $not: null }
      },
      paranoid: false
    }).then(res => {
      if (res) {
        res.restore();
        res.saldo = 0;
        return res.save();
      }
      return this._conta.create({
        portadorId: data.portadorDocument,
        agencia: '00001',
        conta: random.generate({
          length: 6,
          charset: 'numeric'
        }),
        saldo: 0,

      });
    });
  }

  close(query: FindOptions): Promise<any> {
    return this._conta.destroy(query);
  }
  async getInfo(query: FindOptions): Promise<any> {
    return this._conta.findOne(query);
  }
  async withdraw(data: Conta, amount: number): Promise<any> {
    return data.saldo >= amount ? data.update({
      saldo: (Number(data.saldo) - Number(amount)).toString()
    }).then((conta: Conta) => {
      return conta.save();
    }) : data;

  }
  async deposit(data: Conta, amount: number): Promise<any> {
    return data.update({
      saldo: (Number(data.saldo) + Number(amount)).toString()
    }).then((conta: Conta) => {
      return conta.save();
    });
  }

  async manageOperations(conta: Conta, amount: number, operation: string): Promise<any> {

    const operations: any = {
      withdraw: async () => {
        return this.withdraw(conta, amount);
      },
      deposit: async () => {
        return this.deposit(conta, amount);
      }
    };

    return operations[operation](conta);
  }


}
