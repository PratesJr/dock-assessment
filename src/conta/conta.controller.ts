import { NotFoundInterceptor } from '@app/exception-handler';
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
  async create(@Body() body: any): Promise<any> {
    return this._contaService.create(body).then(res => res);
  }

  @Post('operation')
  async changeBalance(@Body() body: any): Promise<any> {
    return this._contaService.manageOperations(body).then(res => res);
  }

  @Delete('close/:document')
  async closeAcount(@Param('document') document: string): Promise<any> {
    return this._contaService.close({
      where: {
        document
      }
    }).then(res => res);
  }
  @Get(':document')
  @UseInterceptors(NotFoundInterceptor)
  async getInfo(@Param('document') document: string): Promise<any> {
    return this._contaService.getInfo(
      {
        where: {
          document
        }
      }
    ).then(res => res);
  }





}
