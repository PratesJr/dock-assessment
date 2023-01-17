import { Conta } from '@app/database';
import { Module } from '@nestjs/common';
import { MovimentacaoModule } from 'src/movimentacao/movimentacao.module';
import { ContaController } from './conta.controller';
import { ContaServiceImpl } from './conta.service';



@Module({
  imports: [MovimentacaoModule],
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
