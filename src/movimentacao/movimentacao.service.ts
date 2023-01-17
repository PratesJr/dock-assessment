import { Movimentacao } from '@app/database';
import { RegisterOperationDto } from '@app/types/dto/register-operation.dto';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.interface';
import { DateTime } from 'luxon';
@Injectable()
export class MovimentacaoServiceImpl implements MovimentacaoService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('MovimentacaoRepository') private _movimentacao: typeof Movimentacao
    // eslint-disable-next-line no-empty-function
  ) { }

  async withdrawRules(contaId: string, amount: number,): Promise<boolean> {
    const start = DateTime.now().startOf('day').toJSDate();
    const end = DateTime.now().endOf('day').toJSDate();
    return this._movimentacao.sum('valor', {
      where: {
        contaId,
        tipo: '-',
        createdAt: { $between: [start, end] }
      },
      logging: true
    }).then((result) => {
      if (Number(result) + Number(amount) > 2000) {
        throw new ForbiddenException();
      }
      return true;
    }).catch(err => {
      throw err;
    });
  }

  register(data: RegisterOperationDto): Promise<Movimentacao> {
    return this._movimentacao.create({ ...data });

  }

  getRegisterByPeriod(contaId: string, period: number): Promise<Movimentacao[]> {
    const start = DateTime.now().minus({ days: period }).startOf('day').toJSDate();
    const end = DateTime.now().toJSDate();
    return this._movimentacao.findAll({
      where: {
        contaId,
        createdAt: { $between: [start, end] }
      }
    });
  }
}
