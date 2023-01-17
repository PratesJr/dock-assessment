import { Conta } from '@app/database';
import { NotFoundInterceptor } from '@app/exception-handler';
import { ChangeBalanceDto, ContaDto } from '@app/types/dto';
import { Body, Controller, Delete, Get, Inject, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { MovimentacaoService } from 'src/movimentacao/movimentacao.interface';
import { ContaService } from './conta.interface';

@Controller('conta')
export class ContaController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('ContaService') private _contaService: ContaService,
    // eslint-disable-next-line no-unused-vars
    @Inject('MovimentacaoService') private _movimentacaoService: MovimentacaoService,
    // eslint-disable-next-line no-empty-function
  ) { }

  @Post()
  async create(@Body() body: ContaDto): Promise<any> {

    return this._contaService.create(body).then(res => {
      return {
        conta: res.conta,
        agencia: res.agencia,
        saldo: res.saldo
      };
    });
  }
  @Get('bank-statement')
  async getStatement(@Query() query: any): Promise<any> {
    const { period, conta } = query;

    return this._movimentacaoService.getRegisterByPeriod(conta, period).then(res => {
      return this._contaService.getInfo({
        where: {
          conta
        },
        attributes: ['saldo']

      }).then(info => {
        return {
          saldo: info.saldo,
          'periodo-extrato': `${period} dias`,
          extrato: res
        };
      });
    });
  }
  @Post('operation')
  async changeBalance(@Body() body: ChangeBalanceDto): Promise<any> {
    return this._contaService.getInfo({
      where: {
        conta: body.conta,
        blocked: { $not: true }
      }
    }).then((conta: Conta) => {
      return this._contaService.manageOperations(conta, body.value, body.operation).then(res => res);
    });
  }

  @Delete('close/:document')
  async closeAcount(@Param('document') document: string): Promise<any> {
    return this._contaService.close({
      where: {
        portadorId: document
      }
    }).then(res => res);
  }
  @Post('block/:document')
  async blockAccount(@Param('document') document: string): Promise<any> {
    return this._contaService.block({ portadorId: document }).then(res => res);
  }
  @Get(':document')
  @UseInterceptors(NotFoundInterceptor)
  async getInfo(@Param('document') document: string): Promise<any> {
    return this._contaService.getInfo(
      {
        where: {
          portadorId: document,
        }
      }
    ).then(res => res);
  }





}
