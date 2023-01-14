import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { PortadorDto } from 'src/types/portador.dto';
import { PortadorService } from './portador.interface';

@Controller('portador')
export class PortadorController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('PortadorService') private _service: PortadorService
    // eslint-disable-next-line no-empty-function
  ) { }

  @Post()
  async addPortador(@Body() body: PortadorDto): Promise<PortadorDto> {
    return this._service.create(body).then(({ document, fullName }) => {
      return {
        document,
        fullName
      };
    });
  }
  @Get(':document')
  async getPortador(@Param('document') document: string): Promise<any> {
    return this._service.findByDocument({
      where: {
        document
      }
    }).then((response) => response).catch((err) => {
      throw err;
    });
  }

  @Delete(':document')
  async delPortador(@Param('document') document: string): Promise<any> {

    return this._service.delete({
      where: {
        document
      }
    }).then((res) => res);
  }

}
