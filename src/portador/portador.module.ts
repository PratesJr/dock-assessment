import { Portador } from '@app/database';
import { Module } from '@nestjs/common';
import { PortadorController } from './portador.controller';
import { PortadorServiceImpl } from './portador.service';


@Module({

  controllers: [PortadorController],
  providers: [
    { provide: 'PortadorService', useClass: PortadorServiceImpl },
    { provide: 'PortadorRepository', useValue: Portador }
  ],
  exports: [
    { provide: 'PortadorService', useClass: PortadorServiceImpl },
    { provide: 'PortadorRepository', useValue: Portador }
  ]
})
export class PortadorModule { }
