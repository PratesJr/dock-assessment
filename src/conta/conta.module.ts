import { Portador } from '@app/database';
import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaServiceImpl } from './conta.service';



@Module({

  controllers: [ContaController],
  providers: [
    { provide: 'ContaService', useClass: ContaServiceImpl },
    { provide: 'ContaRepository', useValue: Portador }
  ],
  exports: [
    { provide: 'ContaService', useClass: ContaServiceImpl },
    { provide: 'ContaRepository', useValue: Portador }
  ]
})
export class ContaModule { }
