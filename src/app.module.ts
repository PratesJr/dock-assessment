import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { PortadorModule } from './portador/portador.module';


@Module({
  imports: [DatabaseModule, PortadorModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
