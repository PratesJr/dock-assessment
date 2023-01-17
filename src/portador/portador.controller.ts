import { NotFoundInterceptor } from '@app/exception-handler';
import { PortadorDto } from '@app/types/dto';
import { Body, Controller, Get, Inject, Param, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiParam
} from '@nestjs/swagger';
import { PortadorService } from './portador.interface';

@ApiTags('Portador')
@Controller('portador')
export class PortadorController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @Inject('PortadorService') private _service: PortadorService
    // eslint-disable-next-line no-empty-function
  ) { }

  @Post()
  @ApiOperation({
    description: 'Rota que cria um novo portador para possibilitar a criacão de uma nova conta'
  })
  @ApiBody({
    type: PortadorDto
  })
  @ApiConflictResponse()
  @ApiCreatedResponse()
  async addPortador(@Body() body: PortadorDto): Promise<PortadorDto> {
    return this._service.create(body).then(({ document, fullName }) => {
      return {
        document,
        fullName
      };
    });
  }
  @Get(':document')
  @ApiOperation({
    description: 'Rota que busca informacões de um portador'
  })
  @ApiParam({
    type: String,
    name: 'document',
    description: 'cpf do portador, precisa ser valido'
  })
  @ApiNotFoundResponse()
  @UseInterceptors(NotFoundInterceptor)
  async getPortador(@Param('document') document: string): Promise<any> {
    return this._service.findByDocument({
      where: {
        document
      }
    }).then((response) => response).catch((err) => {
      throw err;
    });
  }


}
