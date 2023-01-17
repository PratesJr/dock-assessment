import { Conta } from '@app/database';
import { NotFoundInterceptor } from '@app/exception-handler';
import { ChangeBalanceDto, ContaDto } from '@app/types/dto';
import { Body, Controller, Delete, Get, Inject, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiConflictResponse,

  ApiParam,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery
} from '@nestjs/swagger';
import { MovimentacaoService } from 'src/movimentacao/movimentacao.interface';
import { ContaService } from './conta.interface';

ApiTags('Conta');
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
  @ApiOperation({
    description: 'Cria uma conta à partir de um portador ja existente, caso ja exista uma conta desativada, ela é reativada'
  })
  @ApiBody({
    type: ContaDto
  })
  @ApiCreatedResponse()
  @ApiConflictResponse()
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
  @ApiQuery({
    type: Number,
    name: 'period',
    description: 'periodo retroativo que deseja consultar o saldo'
  })
  @ApiQuery({
    type: String,
    name: 'conta',
    description: 'numero da conta'
  })
  @ApiOkResponse({
    description: 'as movimentacoes do periodo e o saldo atual'
  })
  @ApiOperation({
    description: 'lista o extrato da conta'
  })
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
  @ApiOperation({
    description: 'sacar e depositar na conta'
  })
  @ApiCreatedResponse({
    description: 'operacao efetuada, mas caso o o valor seja maior do que o existente em conta, nao sera efetuada.'
  })
  @ApiForbiddenResponse({
    description: 'Se ultrapassar o limite diario de 2000, recebera um erro'
  })
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
  @ApiOperation({
    description: 'Permite encerrar a conta'
  })
  @ApiParam({
    type: String,
    name: 'document',
    description: 'cpf ou cnpj do portador'
  })
  async closeAcount(@Param('document') document: string): Promise<any> {
    return this._contaService.close({
      where: {
        portadorId: document
      }
    }).then(res => res);
  }
  @Post('block/:document')
  @ApiOperation({
    description: 'Permite bloquear a conta, desativando novas operacões'
  })
  @ApiParam({
    type: String,
    name: 'document',
    description: 'cpf ou cnpj do portador'
  })
  async blockAccount(@Param('document') document: string): Promise<any> {
    return this._contaService.block({ portadorId: document }).then(res => res);
  }
  @Get(':document')
  @ApiOperation({
    description: 'Consulta de informacoes e saldo'
  })
  @ApiParam({
    type: String,
    name: 'document',
    description: 'cpf ou cnpj do portador'
  })
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
