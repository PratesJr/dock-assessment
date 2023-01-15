import { DatabaseModule } from '@app/database';
import { HttpLogMiddleware } from '@app/exception-handler';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PortadorModule } from './portador/portador.module';


@Module({
  imports: [DatabaseModule, PortadorModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
