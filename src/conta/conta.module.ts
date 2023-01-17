import { Conta } from '@app/database';
import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaServiceImpl } from './conta.service';



@Module({

  controllers: [ContaController],
  providers: [
    { provide: 'ContaService', useClass: ContaServiceImpl },
    { provide: 'ContaRepository', useValue: Conta }
  ],
  exports: [
    { provide: 'ContaService', useClass: ContaServiceImpl },
    { provide: 'ContaRepository', useValue: Conta }
  ]
})
export class ContaModule { }
