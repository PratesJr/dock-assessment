import { Movimentacao } from '@app/database';
import { forwardRef, Module } from '@nestjs/common';
import { ContaController } from 'src/conta/conta.controller';
import { ContaModule } from 'src/conta/conta.module';
import { MovimentacaoServiceImpl } from './movimentacao.service';




@Module({
  imports: [forwardRef(() => ContaModule)],
  controllers: [ContaController],
  providers: [
    { provide: 'MovimentacaoService', useClass: MovimentacaoServiceImpl },
    { provide: 'MovimentacaoRepository', useValue: Movimentacao }
  ],
  exports: [
    { provide: 'MovimentacaoService', useClass: MovimentacaoServiceImpl },
    { provide: 'MovimentacaoRepository', useValue: Movimentacao }
  ]
})
export class MovimentacaoModule { }
