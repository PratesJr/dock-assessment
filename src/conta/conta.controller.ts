import { Conta } from '@app/database';
import { NotFoundInterceptor } from '@app/exception-handler';
import { ChangeBalanceDto, ContaDto } from '@app/types/dto';
import { Body, Controller, Delete, Get, Inject, Param, Post, UseInterceptors } from '@nestjs/common';

import { ContaService } from './conta.interface';

@Controller('conta')
export class ContaController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('ContaService') private _contaService: ContaService
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
